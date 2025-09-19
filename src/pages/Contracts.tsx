import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Copy, 
  Shield, 
  Database, 
  FileCheck,
  Activity,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contracts = () => {
  const { toast } = useToast();

  const contracts = [
    {
      name: "NotaryRegistry",
      address: "0x17692e10Aa8FD4F1DC28cDaa49827111C4Ab6051",
      description: "Manages trusted notary signatures and attestation validation",
      icon: FileCheck,
      functions: ["addNotary", "removeNotary", "isNotary", "validateSignature"],
      recentEvents: [
        { event: "NotaryAdded", timestamp: "2 hours ago", txHash: "0xabc123..." },
        { event: "SignatureValidated", timestamp: "4 hours ago", txHash: "0xdef456..." }
      ],
      gasUsed: "45,234",
      deployBlock: "2,456,789"
    },
    {
      name: "SPJurisdiction", 
      address: "0xBC8F28D0850Ea65A824c4677E4897a74e2246fC0",
      description: "Storage Provider jurisdiction compliance and verification registry",
      icon: Database,
      functions: ["registerJurisdiction", "updateJurisdiction", "isSPCompliant", "getJurisdiction"],
      recentEvents: [
        { event: "JurisdictionRegistered", timestamp: "1 hour ago", txHash: "0x789abc..." },
        { event: "ComplianceUpdated", timestamp: "6 hours ago", txHash: "0x456def..." }
      ],
      gasUsed: "67,891",
      deployBlock: "2,456,790"
    },
    {
      name: "ResidencyPass",
      address: "0x2D4Ea76Ea27e5fC4E551d8657B79AD30FB48C57E",
      description: "Soulbound NFT residency passes with PDP verification integration",
      icon: Shield,
      functions: ["issuePass", "verifyResidency", "triggerPDPCheck", "revokePass"],
      recentEvents: [
        { event: "PassIssued", timestamp: "30 minutes ago", txHash: "0x123xyz..." },
        { event: "PDPCheckTriggered", timestamp: "2 hours ago", txHash: "0x456xyz..." },
        { event: "ResidencyVerified", timestamp: "3 hours ago", txHash: "0x789xyz..." }
      ],
      gasUsed: "89,123",
      deployBlock: "2,456,791"
    }
  ];

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard`,
    });
  };

  const networkStats = {
    totalTransactions: 247,
    totalGasUsed: "1.2M",
    avgBlockTime: "13s",
    networkHealth: "Excellent"
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-cyan-500/5">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Smart Contracts</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time monitoring and interaction dashboard for ProofPass smart contracts 
            deployed on Filecoin Calibration testnet
          </p>
        </div>

        {/* Network Status Dashboard */}
        <Card className="glass-card mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-emerald-500" />
              <span>Network Status Dashboard</span>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 ml-auto">
                <CheckCircle className="h-3 w-3 mr-1" />
                {networkStats.networkHealth}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {networkStats.totalTransactions}
                </div>
                <div className="text-sm text-muted-foreground">Total Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {networkStats.totalGasUsed}
                </div>
                <div className="text-sm text-muted-foreground">Total Gas Used</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {networkStats.avgBlockTime}
                </div>
                <div className="text-sm text-muted-foreground">Avg Block Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  314159
                </div>
                <div className="text-sm text-muted-foreground">Chain ID</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {contracts.map((contract, index) => {
            const Icon = contract.icon;
            return (
              <Card 
                key={contract.name} 
                className={`glass-card hover:scale-105 transition-all duration-300 animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{contract.name}</CardTitle>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Deployed
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {contract.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contract Address */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Contract Address</div>
                    <div className="flex items-center justify-between">
                      <code className="text-xs font-mono bg-white px-2 py-1 rounded border">
                        {contract.address.slice(0, 10)}...{contract.address.slice(-8)}
                      </code>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(contract.address, `${contract.name} address`)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => window.open(`https://calibration.filfox.info/en/address/${contract.address}`, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Key Functions */}
                  <div>
                    <div className="text-sm font-medium mb-2">Key Functions</div>
                    <div className="flex flex-wrap gap-1">
                      {contract.functions.map((func) => (
                        <Badge key={func} variant="outline" className="text-xs">
                          {func}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <div className="text-sm font-medium mb-2">Recent Activity</div>
                    <div className="space-y-2">
                      {contract.recentEvents.slice(0, 2).map((event, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="font-medium">{event.event}</span>
                          </div>
                          <div className="text-muted-foreground">{event.timestamp}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground">Gas Used</div>
                      <div className="font-mono font-medium">{contract.gasUsed}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Deploy Block</div>
                      <div className="font-mono font-medium">{contract.deployBlock}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass-button text-xs"
                      onClick={() => window.open(`https://remix.ethereum.org/#url=https://github.com/proofpass/contracts/blob/main/${contract.name}.sol`, '_blank')}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Remix
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass-button text-xs"
                      onClick={() => window.open(`https://calibration.filfox.info/en/address/${contract.address}`, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Explorer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Interactive Architecture Diagram */}
        <Card className="glass-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
              <span>Contract Architecture Flow</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <div className="flex items-center justify-center space-x-8 py-8 min-w-max">
                {/* User */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-2">
                    <span className="text-white font-bold">User</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Document Upload</div>
                </div>

                {/* Arrow */}
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>

                {/* NotaryRegistry */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mb-2">
                    <FileCheck className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-xs font-medium">NotaryRegistry</div>
                  <div className="text-xs text-muted-foreground">Signature Validation</div>
                </div>

                {/* Arrow */}
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>

                {/* SPJurisdiction */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-2">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-xs font-medium">SPJurisdiction</div>
                  <div className="text-xs text-muted-foreground">Compliance Check</div>
                </div>

                {/* Arrow */}
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-emerald-400"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>

                {/* ResidencyPass */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mb-2">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-xs font-medium">ResidencyPass</div>
                  <div className="text-xs text-muted-foreground">NFT Minting</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-lg p-4">
              <div className="text-sm font-medium mb-2">Integration Flow</div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>1. User submits compliance documents with jurisdiction metadata</div>
                <div>2. NotaryRegistry validates cryptographic signatures and attestations</div>
                <div>3. SPJurisdiction verifies Storage Provider compliance with selected region</div>
                <div>4. ResidencyPass mints soulbound NFT with PDP monitoring integration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Live contract state and event tracking
              </p>
              <Button size="sm" variant="outline" className="glass-button">
                View Logs
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Contract Interaction</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Direct function calls via Remix IDE
              </p>
              <Button size="sm" variant="outline" className="glass-button">
                Open Remix
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Gas usage and performance metrics
              </p>
              <Button size="sm" variant="outline" className="glass-button">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contracts;