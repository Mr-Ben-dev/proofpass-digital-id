import ResidencyPassABI from "@/abi/ResidencyPass.json";
import ProgressStepper from "@/components/animations/ProgressStepper";
import SuccessAnimation from "@/components/animations/SuccessAnimation";
import { DiagnosticPanel } from "@/components/DiagnosticPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useFeeAmount, useIssuePass } from "@/hooks/useResidencyPass";
import { fadeIn } from "@/utils/motionPresets";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Copy,
  CreditCard,
  ExternalLink,
  FileCheck,
  Loader2,
  Upload
} from "lucide-react";
import { useEffect, useState } from "react";
import { decodeEventLog, formatEther, keccak256, toHex } from "viem";
import { useAccount } from "wagmi";

// Validate ABI import at module level
const validateABI = () => {
  if (!ResidencyPassABI) {
    console.error("[ProofPass] ABI import failed - ResidencyPassABI is null/undefined");
    return false;
  }
  
  if (!Array.isArray(ResidencyPassABI)) {
    console.error("[ProofPass] ABI import failed - ResidencyPassABI is not an array");
    return false;
  }
  
  const passIssuedEvent = ResidencyPassABI.find((item: any) => 
    item.type === 'event' && item.name === 'PassIssued'
  );
  
  if (!passIssuedEvent) {
    console.error("[ProofPass] ABI validation failed - PassIssued event not found");
    return false;
  }
  
  console.log("[ProofPass] ABI validation passed");
  return true;
};

// Calculate PassIssued event signature for manual parsing
const PASS_ISSUED_SIGNATURE = keccak256(toHex("PassIssued(uint256,address,address,string,string,string)"));
console.log("[ProofPass] PassIssued event signature:", PASS_ISSUED_SIGNATURE);

// Transaction state interface for better state management
interface TransactionState {
  hash: string | null;
  passId: string | null;
  isConfirming: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
}

const Prove = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  
  // Enhanced transaction state management
  const [transactionState, setTransactionState] = useState<TransactionState>({
    hash: null,
    passId: null,
    isConfirming: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const { address } = useAccount();
  const { data: fee, isLoading: isFeeLoading } = useFeeAmount();
  const {
    writeContract: issuePass,
    isLoading: isIssuing,
    isSuccess,
    data: issueData,
    hash: transactionHash,
    error: transactionError,
  } = useIssuePass();
  const { toast } = useToast();

  const steps = ["Upload", "Policy", "Pay", "Pass"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    console.log("[ProofPass] Button clicked, checking conditions:", {
      address: !!address,
      country: !!country,
      region: !!region,
      isIssuing,
      isConfirming: transactionState.isConfirming,
      issuePass: !!issuePass
    });

    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!country) {
      toast({
        title: "Missing Information",
        description: "Please select a country in Step 2",
        variant: "destructive",
      });
      return;
    }

    // Reset transaction state
    setTransactionState({
      hash: null,
      passId: null,
      isConfirming: false,
      isSuccess: false,
      isError: false,
      error: null,
    });

    let feeBigInt: bigint = BigInt(0);
    if (typeof fee === "bigint") feeBigInt = fee;
    else if (typeof fee === "string" || typeof fee === "number") feeBigInt = BigInt(fee);
    
    const docCID = "docCID-placeholder"; // TODO: Replace with actual docCID from upload
    const metaCID = "metaCID-placeholder"; // TODO: Replace with actual metaCID if available
    const expiry = BigInt(Math.floor(new Date().getTime() / 1000) + 31536000); // 1 year from now
    
    console.log("[ProofPass] Submitting issuePass with args:", {
      to: address,
      country,
      region,
      docCID,
      metaCID,
      expiry,
      fee: feeBigInt
    });

    try {
      await issuePass(
        address as `0x${string}`,
        country,
        region,
        docCID,
        metaCID,
        expiry,
        feeBigInt
      );
    } catch (err) {
      console.error("[ProofPass] issuePass error:", err);
      
      let errorMessage = "Transaction failed";
      if (err instanceof Error) {
        if (err.message.includes("User rejected")) {
          errorMessage = "Transaction was rejected by user";
        } else if (err.message.includes("insufficient funds")) {
          errorMessage = "Insufficient funds for transaction";
        } else {
          errorMessage = err.message;
        }
      }
      
      setTransactionState(prev => ({
        ...prev,
        isError: true,
        error: errorMessage,
      }));
      
      toast({
        title: "Transaction Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Handle transaction hash update
  useEffect(() => {
    if (transactionHash) {
      console.log("[ProofPass] Transaction hash received:", transactionHash);
      setTransactionState(prev => ({
        ...prev,
        hash: transactionHash,
        isConfirming: true,
      }));
      
      toast({
        title: "Transaction Submitted",
        description: "Waiting for confirmation...",
      });
    }
  }, [transactionHash, toast]);

  // Handle transaction success and extract Pass ID
  useEffect(() => {
    if (isSuccess && issueData) {
      console.log("=== PASS ID EXTRACTION DEBUG START ===");
      console.log("Environment:", {
        isDev: import.meta.env.DEV,
        mode: import.meta.env.MODE,
        baseUrl: import.meta.env.BASE_URL,
        nodeEnv: import.meta.env.NODE_ENV,
        prod: import.meta.env.PROD,
        viemVersion: "CHECK_PACKAGE_JSON"
      });
      
      console.log("Environment Variables Check:");
      console.log("- VITE_WALLET_CONNECT_PROJECT_ID:", import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID ? "SET" : "NOT_SET");
      console.log("- VITE_RPC_URL:", import.meta.env.VITE_RPC_URL ? "SET" : "NOT_SET");
      console.log("- VITE_CONTRACT_ADDRESS:", import.meta.env.VITE_CONTRACT_ADDRESS ? "SET" : "NOT_SET");
      console.log("- All env vars:", import.meta.env);
      
      console.log("Network & RPC Configuration:");
      console.log("- Configured RPC: https://calibration.filfox.info/rpc/v1");
      console.log("- Transaction hash:", transactionHash);
      console.log("- Chain ID: 314159 (Filecoin Calibration)");
      console.log("- Account connected:", !!address);
      console.log("- Account address:", address);
      
      console.log("[ProofPass] Transaction confirmed, parsing receipt:", issueData);
      console.log("[ProofPass] Receipt structure analysis:");
      console.log("- Transaction hash:", issueData.transactionHash);
      console.log("- Block number:", issueData.blockNumber);
      console.log("- Block hash:", issueData.blockHash);
      console.log("- Gas used:", issueData.gasUsed?.toString());
      console.log("- Effective gas price:", issueData.effectiveGasPrice?.toString());
      console.log("- Status:", issueData.status);
      console.log("- Logs count:", issueData.logs?.length || 0);
      console.log("- Contract address:", issueData.contractAddress);
      console.log("- From:", issueData.from);
      console.log("- To:", issueData.to);
      console.log("- Raw logs:", issueData.logs);
      
      // Validate ABI import
      console.log("[ProofPass] ABI validation:");
      console.log("- ABI imported:", !!ResidencyPassABI);
      console.log("- ABI type:", typeof ResidencyPassABI);
      console.log("- ABI length:", Array.isArray(ResidencyPassABI) ? ResidencyPassABI.length : "NOT_ARRAY");
      
      const abiValid = validateABI();
      console.log("- ABI validation result:", abiValid);
      
      // Find PassIssued event in ABI
      const passIssuedEvent = Array.isArray(ResidencyPassABI) 
        ? ResidencyPassABI.find((item: any) => item.type === 'event' && item.name === 'PassIssued')
        : null;
      console.log("- PassIssued event found in ABI:", !!passIssuedEvent);
      console.log("- PassIssued event structure:", passIssuedEvent);
      
      try {
        // Look for PassIssued event in the logs
        let extractedPassId: string | null = null;
        
        for (const [index, log] of issueData.logs.entries()) {
          console.log(`[ProofPass] Processing log ${index + 1}/${issueData.logs.length}:`, {
            address: log.address,
            topics: log.topics,
            data: log.data,
            topicsLength: log.topics?.length || 0
          });
          
          try {
            // Use viem's decodeEventLog to properly parse the PassIssued event
            const decodedLog = decodeEventLog({
              abi: ResidencyPassABI,
              data: log.data,
              topics: log.topics,
            });
            
            console.log(`[ProofPass] Successfully decoded log ${index + 1}:`, decodedLog);
            console.log("- Event name:", decodedLog.eventName);
            console.log("- Event args:", decodedLog.args);
            
            // Check if this is the PassIssued event
            if (decodedLog.eventName === 'PassIssued') {
              // Extract passId from the decoded event args with proper typing
              const args = decodedLog.args as any;
              const passIdValue = args.passId || args[0]; // Try named property first, then indexed
              extractedPassId = passIdValue.toString();
              console.log(`[ProofPass] ✅ FOUND PassIssued event in log ${index + 1}!`);
              console.log("- Raw passId value:", passIdValue);
              console.log("- PassId type:", typeof passIdValue);
              console.log("- Extracted Pass ID:", extractedPassId);
              break;
            } else {
              console.log(`[ProofPass] Log ${index + 1} is ${decodedLog.eventName}, not PassIssued`);
            }
          } catch (decodeError) {
            console.log(`[ProofPass] Could not decode log ${index + 1} as PassIssued event:`, decodeError);
            
            // Try manual parsing as fallback
            if (log.topics && log.topics.length >= 4) {
              console.log(`[ProofPass] Attempting manual parsing of log ${index + 1}:`);
              console.log("- Topics[0] (event signature):", log.topics[0]);
              console.log("- Expected PassIssued signature:", PASS_ISSUED_SIGNATURE);
              console.log("- Signature match:", log.topics[0] === PASS_ISSUED_SIGNATURE);
              console.log("- Topics[1] (passId):", log.topics[1]);
              console.log("- Topics[2] (to):", log.topics[2]);
              console.log("- Topics[3] (issuer):", log.topics[3]);
              
              // Verify this is actually a PassIssued event by checking signature
              if (log.topics[0] === PASS_ISSUED_SIGNATURE) {
                try {
                  const passIdHex = log.topics[1];
                  const manualPassId = BigInt(passIdHex).toString();
                  console.log(`[ProofPass] Manual extraction from verified PassIssued event: ${manualPassId}`);
                  
                  if (!extractedPassId && manualPassId !== "0") {
                    extractedPassId = manualPassId;
                    console.log(`[ProofPass] ✅ Using manual extraction: ${extractedPassId}`);
                  }
                } catch (manualError) {
                  console.log(`[ProofPass] Manual parsing failed for log ${index + 1}:`, manualError);
                }
              } else {
                console.log(`[ProofPass] Log ${index + 1} event signature doesn't match PassIssued`);
              }
            }
            continue;
          }
        }

        console.log("[ProofPass] Final extraction result:", extractedPassId);
        console.log("=== PASS ID EXTRACTION DEBUG END ===");

        if (extractedPassId && extractedPassId !== "0") {
          console.log(`[ProofPass] ✅ SUCCESS: Using Pass ID ${extractedPassId}`);
          setTransactionState(prev => ({
            ...prev,
            passId: extractedPassId,
            isConfirming: false,
            isSuccess: true,
          }));
          
          // Advance to Step 4 (Pass)
          setCurrentStep(3);
          
          toast({
            title: "Pass Issued Successfully!",
            description: `Your Residency Pass #${extractedPassId} has been minted`,
          });
        } else {
          console.error("[ProofPass] ❌ FAILURE: Could not extract valid Pass ID from transaction logs");
          console.error("Final extractedPassId value:", extractedPassId);
          console.error("Logs were:", issueData.logs);
          
          // Set a fallback Pass ID to prevent total failure
          const fallbackPassId = "UNKNOWN";
          console.warn(`[ProofPass] Using fallback Pass ID: ${fallbackPassId}`);
          
          setTransactionState(prev => ({
            ...prev,
            passId: fallbackPassId,
            isConfirming: false,
            isError: true,
            error: `Pass ID extraction failed. Extracted: "${extractedPassId}". Check console for details.`,
          }));
          
          toast({
            title: "Transaction Completed with Issues",
            description: "Pass was minted but ID extraction failed. Check console for details.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("[ProofPass] Error parsing transaction receipt:", error);
        setTransactionState(prev => ({
          ...prev,
          isConfirming: false,
          isError: true,
          error: "Failed to parse transaction receipt",
        }));
      }
    }
  }, [isSuccess, issueData, toast]);

  // Handle transaction errors
  useEffect(() => {
    if (transactionError) {
      console.error("[ProofPass] Transaction error:", transactionError);
      setTransactionState(prev => ({
        ...prev,
        isConfirming: false,
        isError: true,
        error: transactionError.message || "Transaction failed",
      }));
    }
  }, [transactionError]);

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard`,
    });
  };

  return (
    <motion.div
      className="min-h-screen py-12 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-cyan-500/5"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Issue Residency Pass</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a cryptographically verifiable proof of data residency with
            soulbound NFT technology
          </p>
        </div>

        <ProgressStepper steps={steps} currentStep={currentStep} />

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div key={0} variants={fadeIn}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Upload className="h-6 w-6 text-emerald-500" />
                      <span>Upload Compliance Documents</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-emerald-200 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                        <div className="text-lg font-medium text-foreground mb-2">
                          {file ? file.name : "Drop your documents here"}
                        </div>
                      </label>
                      {filePreview && (
                        <img
                          src={filePreview}
                          alt="File preview"
                          className="mt-4 max-h-48 mx-auto"
                        />
                      )}
                    </div>
                    <Button
                      onClick={() => setCurrentStep(1)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div key={1} variants={fadeIn}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileCheck className="h-6 w-6 text-emerald-500" />
                      <span>Jurisdiction Policy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Select onValueChange={setCountry}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">🇺🇸 United States</SelectItem>
                            <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="region">Region (Optional)</Label>
                        <Input
                          placeholder="e.g., California, Ontario"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key={2} variants={fadeIn}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-6 w-6 text-emerald-500" />
                      <span>Payment & Issuance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <p className="text-muted-foreground">Issuance Fee</p>
                      <p className="text-4xl font-bold">
                        {isFeeLoading
                          ? "Loading..."
                          : typeof fee === "bigint" ||
                            typeof fee === "number" ||
                            typeof fee === "string"
                          ? `${formatEther(BigInt(fee))} tFIL`
                          : "N/A"}
                      </p>
                    </div>

                    {/* Transaction Status Display */}
                    {transactionState.isConfirming && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                          <span className="text-blue-400">
                            Transaction submitted. Waiting for confirmation...
                          </span>
                        </div>
                        {transactionState.hash && (
                          <div className="mt-2 text-center">
                            <a
                              href={`https://calibration.filfox.info/en/message/${transactionState.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-400 hover:underline"
                            >
                              View transaction on explorer
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Error Display */}
                    {transactionState.isError && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-400" />
                          <span className="text-red-400">{transactionState.error}</span>
                        </div>
                      </div>
                    )}

                    {/* Debug info - remove in production */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-xs">
                        <div className="font-semibold mb-2">Debug Info:</div>
                        <div>Address: {address ? '✓' : '✗'}</div>
                        <div>Country: {country ? `✓ (${country})` : '✗'}</div>
                        <div>Region: {region ? `✓ (${region})` : '✗ (optional)'}</div>
                        <div>issuePass: {issuePass ? '✓' : '✗'}</div>
                        <div>isIssuing: {isIssuing ? '✓' : '✗'}</div>
                        <div>isConfirming: {transactionState.isConfirming ? '✓' : '✗'}</div>
                      </div>
                    )}

                    <Button
                      onClick={handleSubmit}
                      disabled={
                        isIssuing || 
                        transactionState.isConfirming || 
                        !issuePass || 
                        !address ||
                        !country
                        // Removed !region since it's marked as optional in Step 2
                      }
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      {isIssuing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Confirming in Wallet...
                        </>
                      ) : transactionState.isConfirming ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Confirming Transaction...
                        </>
                      ) : (
                        "Confirm & Issue Pass"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && transactionState.isSuccess && transactionState.passId && (
              <motion.div key={3} variants={fadeIn} className="relative">
                <SuccessAnimation active={true} />
                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="h-10 w-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-emerald-600 mb-2">
                      Pass Issued Successfully!
                    </h2>
                    <div className="text-4xl font-bold gradient-text mb-4">
                      #{transactionState.passId}
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Your residency pass has been created and stored on the blockchain
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(transactionState.passId!, "Pass ID")}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Pass ID
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `${window.location.origin}/verify?passId=${transactionState.passId}`,
                          "Verification Link"
                        )}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Verification Link
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            `https://calibration.filfox.info/en/message/${transactionState.hash}`,
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Explorer
                      </Button>
                      <Button
                        onClick={() => {
                          setCurrentStep(0);
                          setTransactionState({
                            hash: null,
                            passId: null,
                            isConfirming: false,
                            isSuccess: false,
                            isError: false,
                            error: null,
                          });
                          setFile(null);
                          setFilePreview(null);
                          setCountry("");
                          setRegion("");
                        }}
                        size="sm"
                      >
                        Create Another Pass
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Diagnostic Panel - Only show in development or when needed */}
      {(import.meta.env.DEV || new URLSearchParams(window.location.search).has('debug')) && (
        <DiagnosticPanel />
      )}
    </motion.div>
  );
};

export default Prove;