import LoadingSkeleton from "@/components/animations/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
    useGetPDPFreshness,
    usePdpFee,
    useTriggerPDPCheck,
    useVerifyResidency,
} from "@/hooks/useResidencyPass";
import { fadeIn, staggerContainer, staggerItem } from "@/utils/motionPresets";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
    AlertCircle,
    CheckCircle,
    Clock,
    FileText,
    RefreshCw,
    Search,
    Share2,
    Shield,
    WifiOff
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [passId, setPassId] = useState(searchParams.get("passId") || "");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const passCardRef = useRef<HTMLDivElement>(null);

  // Safe BigInt conversion with validation
  const passIdBigInt = (() => {
    if (!passId || passId.trim() === "" || isNaN(Number(passId))) {
      return null;
    }
    try {
      const num = Number(passId);
      if (num <= 0) return null;
      return BigInt(passId);
    } catch {
      return null;
    }
  })();

  const {
    data: verificationResult,
    isLoading,
    isError,
    error,
    refetch: refetchVerification,
  } = useVerifyResidency(isVerifying ? passIdBigInt : null);
  const { data: pdpFreshness, refetch: refetchFreshness } = useGetPDPFreshness(
    verificationResult?.[0] ? passIdBigInt : null
  );
  const { data: pdpFee } = usePdpFee();
  const { writeContract: triggerPDP, isLoading: isTriggeringPDP } =
    useTriggerPDPCheck();

  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Component cleanup effect
  useEffect(() => {
    return () => {
      // Reset states when component unmounts to prevent stale state
      setIsVerifying(false);
    };
  }, []);

  useEffect(() => {
    const urlPassId = searchParams.get("passId");
    
    // Only trigger verification if URL has a valid passId
    if (urlPassId && urlPassId.trim() !== "" && !isNaN(Number(urlPassId))) {
      setPassId(urlPassId);
      setIsVerifying(true);
    } else if (urlPassId) {
      // If URL has invalid passId, show error but don't trigger verification
      toast({
        title: "Invalid Pass ID",
        description: "Please enter a valid Pass ID number",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  const handleVerify = () => {
    // Input validation before any contract call
    if (!passId || passId.trim() === "") {
      toast({
        title: "Missing Pass ID",
        description: "Please enter a Pass ID to verify",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(Number(passId))) {
      toast({
        title: "Invalid Pass ID",
        description: "Please enter a valid Pass ID number",
        variant: "destructive",
      });
      return;
    }

    // Additional validation for negative numbers or zero
    const passIdNum = Number(passId);
    if (passIdNum <= 0) {
      toast({
        title: "Invalid Pass ID",
        description: "Pass ID must be a positive number",
        variant: "destructive",
      });
      return;
    }

    setSearchParams({ passId });
    setIsVerifying(true);
    refetchVerification();
  };

  const handleTriggerPDP = () => {
    // Validate passId before triggering PDP
    if (!passIdBigInt) {
      toast({
        title: "Invalid Pass ID",
        description: "Please enter a valid Pass ID first",
        variant: "destructive",
      });
      return;
    }

    let pdpFeeBigInt: bigint = BigInt(0);
    if (typeof pdpFee === "bigint") pdpFeeBigInt = pdpFee;
    else if (typeof pdpFee === "string" || typeof pdpFee === "number")
      pdpFeeBigInt = BigInt(pdpFee);
    triggerPDP(passIdBigInt, pdpFeeBigInt);
    toast({
      title: "PDP Check Initiated",
      description: "This will take a few moments.",
    });
    setTimeout(() => refetchFreshness(), 30000); // Refetch after 30s
  };

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard`,
    });
  };

  const exportToPdf = () => {
    if (passCardRef.current) {
      html2canvas(passCardRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          0,
          undefined,
          "FAST"
        );
        pdf.save(`ProofPass-${passId}.pdf`);
      });
    }
  };

  const sharePass = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `ProofPass Verification for Pass ID #${passId}`,
          text: `Check out the verification for ProofPass ID #${passId}`,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      copyToClipboard(window.location.href, "Verification link");
    }
  };

  const isValid = verificationResult?.[0];
  const passData = verificationResult?.[1];

  return (
    <motion.div
      className="min-h-screen py-12 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-cyan-500/5"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {!isOnline && (
          <div className="flex items-center justify-center space-x-2 text-red-500 bg-red-500/10 p-4 rounded-lg mb-8">
            <WifiOff />
            <p>You are offline. Some features may not be available.</p>
          </div>
        )}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Verify Residency Pass</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter a Pass ID to instantly verify jurisdiction compliance and data
            freshness
          </p>
        </div>

        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-6 w-6 text-emerald-500" />
              <span>Pass Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter Pass ID (e.g., 1)"
                  value={passId}
                  onChange={(e) => setPassId(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
              <Button
                onClick={handleVerify}
                disabled={isLoading || !passId || !passIdBigInt}
                className="px-8 h-12 bg-emerald-500 hover:bg-emerald-600 press-scale hover-glow"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {isLoading && <LoadingSkeleton className="h-96" />}

          {isError && (
            <motion.div variants={fadeIn}>
              <Card className="glass-card mb-8 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 text-red-600">
                    <AlertCircle className="h-6 w-6" />
                    <div>
                      <div className="font-semibold">Verification Failed</div>
                      <div className="text-sm">{error?.message}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {isValid && passData && (
            <motion.div
              ref={passCardRef}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <Card className="glass-card animate-scale-in border-emerald-200">
                <CardHeader className="pb-4">
                  <motion.div
                    variants={staggerItem}
                    className="flex items-center justify-between"
                  >
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                      <span className="text-emerald-600">
                        Pass Verified Successfully
                      </span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        {passData.country} &rarr; {passData.region}
                      </Badge>
                      <Badge
                        className={
                          pdpFreshness?.[0]
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {pdpFreshness?.[0] ? "Fresh" : "Stale"}
                      </Badge>
                    </div>
                  </motion.div>
                  <motion.p
                    variants={staggerItem}
                    className="text-muted-foreground"
                  >
                    {pdpFreshness?.[1]
                      ? `Last PDP check: ${formatDistanceToNow(
                          new Date(Number(pdpFreshness[1]) * 1000)
                        )} ago`
                      : ""}
                  </motion.p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleTriggerPDP}
                      disabled={isTriggeringPDP}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {isTriggeringPDP ? "Refreshing..." : "Refresh PDP Status"}
                    </Button>
                    <Button onClick={exportToPdf}>
                      <FileText className="mr-2 h-4 w-4" /> Export as PDF
                    </Button>
                    <Button onClick={sharePass}>
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Verify;
