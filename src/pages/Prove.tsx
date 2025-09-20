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
    ArrowRight,
    CheckCircle,
    Copy,
    CreditCard,
    ExternalLink,
    FileCheck,
    Upload
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatEther, parseAbiItem } from "viem";
import { useAccount } from "wagmi";

const Prove = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [passId, setPassId] = useState<string | null>(null);

  const { address } = useAccount();
  const { data: fee, isLoading: isFeeLoading } = useFeeAmount();
  const {
    writeContract: issuePass,
    isLoading: isIssuing,
    isSuccess,
    data: issueData,
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
      const tx = await issuePass(
        address as `0x${string}`,
        country,
        region,
        docCID,
        metaCID,
        expiry,
        feeBigInt
      );
      console.log("[ProofPass] issuePass transaction result:", tx);
    } catch (err) {
      console.error("[ProofPass] issuePass error:", err);
      toast({
        title: "Transaction Failed",
        description: err instanceof Error ? err.message : String(err),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isSuccess && issueData) {
      // The passId is in the logs of the transaction data.
      // We need to parse the logs to find the PassIssued event.
      // This is a simplified example.
      // Find the PassIssued event log and extract passId
      const passIssuedEventSig =
        "0x" +
        parseAbiItem(
          "event PassIssued(uint256 passId, address to, address issuer, string country, string region, string docCID)"
        ).name;
      const event = issueData.logs.find(
        (log: any) =>
          log.topics &&
          log.topics.length > 0 &&
          log.topics[0] === passIssuedEventSig
      );
      if (event) {
        // passId is the first topic after the event signature
        const newPassId = BigInt(event.topics[1]).toString();
        setPassId(newPassId);
        setCurrentStep(3);
        toast({
          title: "Pass Issued Successfully!",
          description: `Your Residency Pass #${newPassId} has been minted`,
        });
      }
    }
  }, [isSuccess, issueData, toast]);

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
                    <Button
                      onClick={handleSubmit}
                      disabled={isIssuing || !issuePass}
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      {isIssuing ? "Processing..." : "Confirm & Issue Pass"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && passId && (
              <motion.div key={3} variants={fadeIn} className="relative">
                <SuccessAnimation active={true} />
                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-emerald-600 mb-2">
                      Pass Issued Successfully!
                    </h2>
                    <div className="text-4xl font-bold gradient-text mb-4">
                      #{passId}
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(passId, "Pass ID")}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy ID
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            `https://calibration.filfox.info/en/message/${issueData?.transactionHash}`,
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Explorer
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