import ResidencyPassABI from "@/abi/ResidencyPass.json";
import ProgressStepper from "@/components/animations/ProgressStepper";
import SuccessAnimation from "@/components/animations/SuccessAnimation";
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
import { decodeEventLog, formatEther } from "viem";
import { useAccount } from "wagmi";

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
      console.log("[ProofPass] Transaction confirmed, parsing receipt:", issueData);
      
      try {
        // Look for PassIssued event in the logs
        let extractedPassId: string | null = null;
        
        for (const log of issueData.logs) {
          try {
            // Use viem's decodeEventLog to properly parse the PassIssued event
            const decodedLog = decodeEventLog({
              abi: ResidencyPassABI,
              data: log.data,
              topics: log.topics,
            });
            
            console.log("[ProofPass] Decoded log:", decodedLog);
            
            // Check if this is the PassIssued event
            if (decodedLog.eventName === 'PassIssued') {
              // Extract passId from the decoded event args
              const passIdValue = decodedLog.args.passId;
              extractedPassId = passIdValue.toString();
              console.log("[ProofPass] Extracted Pass ID from PassIssued event:", extractedPassId);
              break;
            }
          } catch (decodeError) {
            console.log("[ProofPass] Could not decode log as PassIssued event:", decodeError);
            continue;
          }
        }

        if (extractedPassId) {
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
          console.error("[ProofPass] Could not extract Pass ID from transaction logs");
          setTransactionState(prev => ({
            ...prev,
            isConfirming: false,
            isError: true,
            error: "Pass ID could not be extracted from transaction",
          }));
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
    </motion.div>
  );
};

export default Prove;