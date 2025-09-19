import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  Search, 
  ExternalLink, 
  Copy,
  RefreshCw,
  AlertCircle,
  Clock,
  FileCheck,
  QrCode,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Verify = () => {
  const [passId, setPassId] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock verification data for Pass ID 1
  const mockPassData = {
    id: "1",
    isValid: true,
    jurisdiction: "US",
    region: "CA",
    pdpStatus: "Fresh",
    lastChecked: "2 hours ago",
    issuedDate: "Sept 19, 2024",
    expiry: "No expiry set",
    storageProvider: "0xe164...9be32",
    docCID: "bafy2bzac...",
    metaCID: "bafy2bzac...",
    totalPDPChecks: 2,
    owner: "0x742d35Cc6533C4532CE8B9DE1991Fbf8E936DD84"
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);
    setVerificationResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (passId === "1") {
      setVerificationResult(mockPassData);
      toast({
        title: "Verification Complete",
        description: "Pass validated successfully",
      });
    } else {
      setError("Pass not found, expired, or revoked");
    }

    setIsLoading(false);
  };

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard`,
    });
  };

  const refreshPDPStatus = () => {
    toast({
      title: "PDP Check Initiated",
      description: "Freshness verification in progress (costs 0.1 tFIL)",
    });
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-cyan-500/5">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Verify Residency Pass</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter a Pass ID to instantly verify jurisdiction compliance and data freshness
          </p>
        </div>

        {/* Demo Section */}
        <Card className="glass-card mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-6 w-6 text-emerald-500" />
              <span>Pass Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="font-medium text-emerald-800">Try the Demo</span>
              </div>
              <p className="text-emerald-700 text-sm">
                Use Pass ID "1" to see a live verification example with real on-chain data
              </p>
            </div>

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
                disabled={isLoading || !passId}
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

        {/* Error State */}
        {error && (
          <Card className="glass-card mb-8 animate-scale-in border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 text-red-600">
                <AlertCircle className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Verification Failed</div>
                  <div className="text-sm">{error}</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-red-600/80">
                Please verify the Pass ID is correct or contact the issuer for assistance.
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success State */}
        {verificationResult && verificationResult.isValid && (
          <Card className="glass-card animate-scale-in border-emerald-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-emerald-500 animate-pulse" />
                  <span className="text-emerald-600">Pass Verified Successfully</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    🇺🇸 US → CA
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Fresh ✅
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground">
                Last PDP check: {verificationResult.lastChecked} - Data freshness confirmed
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Pass ID</div>
                  <div className="text-2xl font-bold text-emerald-600">#{verificationResult.id}</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Issued</div>
                  <div className="font-semibold text-foreground">{verificationResult.issuedDate}</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Total PDP Checks</div>
                  <div className="font-semibold text-foreground">{verificationResult.totalPDPChecks}</div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Expiry:</span>
                    <span className="font-medium">{verificationResult.expiry}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Storage Provider:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{verificationResult.storageProvider}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard("0xe164d9d7e8d7c4532ce8b9de1991fbf8e936dd84", "Storage Provider address")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Document CID:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{verificationResult.docCID}...</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard("bafy2bzacebkpnx7yjq7q7q7q7q7q7q7q7q7q7q7q7q", "Document CID")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Metadata CID:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{verificationResult.metaCID}...</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard("bafy2bzacebkpnx7yjq8q8q8q8q8q8q8q8q8q8q8q8q", "Metadata CID")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Owner:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {verificationResult.owner.slice(0, 6)}...{verificationResult.owner.slice(-4)}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(verificationResult.owner, "Owner address")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="glass-button w-full"
                  onClick={() => window.open(`https://calibration.filfox.info/en/message/${verificationResult.id}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Explorer
                </Button>
                
                <Button
                  variant="outline"
                  className="glass-button w-full"
                  onClick={() => copyToClipboard(`https://proofpass.app/verify?id=${verificationResult.id}`, "Pass verification link")}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Pass Link
                </Button>
                
                <Button
                  variant="outline"
                  className="glass-button w-full hover-glow-cyan"
                  onClick={refreshPDPStatus}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh PDP
                </Button>
                
                <Button
                  variant="outline"
                  className="glass-button w-full"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR
                </Button>
              </div>

              {/* Technical Details Expandable */}
              <details className="group">
                <summary className="cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Technical Details</span>
                    <FileCheck className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                  </div>
                </summary>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <pre className="text-xs text-muted-foreground font-mono overflow-x-auto">
{JSON.stringify({
  passId: verificationResult.id,
  jurisdiction: {
    country: verificationResult.jurisdiction,
    region: verificationResult.region
  },
  pdp: {
    status: verificationResult.pdpStatus,
    lastCheck: verificationResult.lastChecked,
    totalChecks: verificationResult.totalPDPChecks
  },
  blockchain: {
    network: "Filecoin Calibration",
    chainId: 314159,
    contract: "0x2D4Ea76Ea27e5fC4E551d8657B79AD30FB48C57E"
  }
}, null, 2)}
                  </pre>
                </div>
              </details>
            </CardContent>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Verify any ProofPass residency NFT instantly using its unique Pass ID. 
                All verifications are cryptographically secured and tamper-proof.
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>• Instant blockchain verification</div>
                <div>• Real-time PDP freshness checks</div>
                <div>• Cryptographic proof validation</div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Understanding Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Pass verification confirms jurisdiction compliance, data freshness, 
                and notary attestation integrity.
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>• 🟢 Fresh: Data verified within 24h</div>
                <div>• 🟡 Stale: Requires PDP refresh</div>
                <div>• 🔴 Invalid: Pass revoked or expired</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verify;