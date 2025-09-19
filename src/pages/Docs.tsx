import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Zap, 
  Code, 
  Shield, 
  PlayCircle,
  ExternalLink,
  CheckCircle,
  Clock,
  Users,
  Lightbulb,
  FileText,
  Database,
  Key,
  Settings
} from "lucide-react";

const Docs = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const quickStartSteps = [
    {
      title: "Verify Demo Pass",
      description: "Try Pass ID '1' to see live verification",
      action: "Go to Verify",
      href: "/verify",
      time: "30 seconds"
    },
    {
      title: "Explore Contracts",
      description: "Review deployed smart contracts on Calibration",
      action: "View Contracts",
      href: "/contracts", 
      time: "2 minutes"
    },
    {
      title: "Issue New Pass",
      description: "Walk through the complete pass issuance flow",
      action: "Start Proving",
      href: "/prove",
      time: "5 minutes"
    }
  ];

  const architectureComponents = [
    {
      name: "NotaryRegistry",
      description: "Cryptographic signature validation and trusted notary management",
      address: "0x17692e10Aa8FD4F1DC28cDaa49827111C4Ab6051",
      functions: ["addNotary", "removeNotary", "isNotary", "validateSignature"]
    },
    {
      name: "SPJurisdiction",
      description: "Storage Provider compliance verification and jurisdiction registry",
      address: "0xBC8F28D0850Ea65A824c4677E4897a74e2246fC0",
      functions: ["registerJurisdiction", "updateJurisdiction", "isSPCompliant"]
    },
    {
      name: "ResidencyPass",
      description: "Soulbound NFT passes with integrated PDP verification system",
      address: "0x2D4Ea76Ea27e5fC4E551d8657B79AD30FB48C57E",
      functions: ["issuePass", "verifyResidency", "triggerPDPCheck", "revokePass"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Soulbound Security",
      description: "Non-transferable NFTs prevent pass trading and ensure identity binding"
    },
    {
      icon: Database,
      title: "PDP Integration",
      description: "Real-time Proof of Data Possession monitoring with 24h freshness guarantees"
    },
    {
      icon: Key,
      title: "Cryptographic Proofs",
      description: "ECDSA signature verification ensures tamper-proof attestations"
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Sub-second jurisdiction checking with blockchain finality"
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-cyan-500/5">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete technical documentation and integration guides for ProofPass 
            verifiable data residency platform
          </p>
        </div>

        {/* Judge Demo Section */}
        <Card className="glass-card mb-12 border-emerald-200 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <PlayCircle className="h-6 w-6 text-emerald-500" />
                <span>90-Second Judge Demo</span>
              </CardTitle>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                <Clock className="h-3 w-3 mr-1" />
                Quick Start
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Perfect for hackathon judges - explore ProofPass features in under 90 seconds
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickStartSteps.map((step, index) => (
                <Card key={step.title} className="bg-white/50 border-emerald-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        Step {index + 1}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{step.time}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                      onClick={() => window.location.href = step.href}
                    >
                      {step.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Documentation Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 glass-card">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-emerald-500" />
                  <span>What is ProofPass?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  ProofPass is a revolutionary blockchain-based proof-of-residency verification system 
                  built on Filecoin Calibration testnet. It enables cryptographic proof of data residency 
                  through soulbound NFTs, ensuring jurisdiction compliance for sensitive data storage.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={feature.title} className="flex items-start space-x-3">
                        <div className="p-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Key Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Cryptographically verifiable residency proofs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Real-time data freshness monitoring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Soulbound NFT prevents unauthorized transfers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>OpenZeppelin security standards</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-8">
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-6 w-6 text-emerald-500" />
                  <span>Smart Contract Architecture</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  ProofPass consists of three interconnected smart contracts deployed on Filecoin Calibration testnet,
                  each handling specific aspects of the verification pipeline.
                </p>

                <div className="space-y-6">
                  {architectureComponents.map((component, index) => (
                    <Card key={component.name} className="bg-gradient-to-r from-gray-50 to-emerald-50/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{component.name}</h3>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`https://calibration.filfox.info/en/address/${component.address}`, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Contract
                          </Button>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{component.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium mb-1">Contract Address</div>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                              {component.address}
                            </code>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-2">Key Functions</div>
                            <div className="flex flex-wrap gap-2">
                              {component.functions.map((func) => (
                                <Badge key={func} variant="outline" className="text-xs">
                                  {func}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Reference Tab */}
          <TabsContent value="api" className="space-y-8">
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-6 w-6 text-emerald-500" />
                  <span>API Reference</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Network Configuration</h3>
                  <div className="space-y-2 text-sm font-mono">
                    <div><span className="text-muted-foreground">Network:</span> Filecoin Calibration</div>
                    <div><span className="text-muted-foreground">Chain ID:</span> 314159</div>
                    <div><span className="text-muted-foreground">RPC URL:</span> https://api.calibration.node.glif.io/rpc/v1</div>
                    <div><span className="text-muted-foreground">Explorer:</span> https://calibration.filfox.info/en</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Core Functions</h3>
                  <div className="space-y-4">
                    <Card className="bg-gradient-to-r from-emerald-50 to-cyan-50">
                      <CardContent className="p-4">
                        <div className="font-mono text-sm mb-2">
                          <span className="text-emerald-600">function</span> verifyResidency(uint256 passId)
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Verify the validity and jurisdiction compliance of a residency pass
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <strong>Returns:</strong> bool isValid, string jurisdiction, uint256 lastPDPCheck
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <CardContent className="p-4">
                        <div className="font-mono text-sm mb-2">
                          <span className="text-blue-600">function</span> issuePass(string jurisdiction, bytes signature)
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Issue a new soulbound residency pass with notary validation
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <strong>Returns:</strong> uint256 passId
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <CardContent className="p-4">
                        <div className="font-mono text-sm mb-2">
                          <span className="text-purple-600">function</span> triggerPDPCheck(uint256 passId)
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Trigger a fresh Proof of Data Possession verification
                        </p>
                        <div className="text-xs text-muted-foreground">
                          <strong>Cost:</strong> 0.1 tFIL gas fee
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                    Integration Example
                  </h3>
                  <pre className="text-xs font-mono overflow-x-auto bg-white p-3 rounded border">
{`// Web3 Integration Example
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(
  'https://api.calibration.node.glif.io/rpc/v1'
);

const contract = new ethers.Contract(
  '0x2D4Ea76Ea27e5fC4E551d8657B79AD30FB48C57E',
  ResidencyPassABI,
  provider
);

// Verify a pass
const result = await contract.verifyResidency(1);
console.log('Valid:', result.isValid);`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-8">
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-emerald-500" />
                  <span>Security & Audit</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-r from-emerald-50 to-green-50">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
                        OpenZeppelin Standards
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Built using battle-tested OpenZeppelin contracts for maximum security
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Key className="h-4 w-4 mr-2 text-blue-600" />
                        Cryptographic Proofs
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ECDSA signature verification ensures tamper-proof attestations
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Security Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Soulbound NFT prevents transfers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Multi-signature notary validation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Time-based expiration controls</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Reentrancy protection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Access control mechanisms</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Gas optimization patterns</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800 mb-1">Testnet Deployment</div>
                      <div className="text-sm text-yellow-700">
                        Current deployment is on Filecoin Calibration testnet for demonstration purposes. 
                        Production deployment would include comprehensive security audits.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Tab */}
          <TabsContent value="integration" className="space-y-8">
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-emerald-500" />
                  <span>Integration Guide</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Integrate ProofPass into your application to provide verifiable data residency 
                  certificates for your users and storage providers.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Getting Started</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="text-sm font-mono overflow-x-auto">
{`npm install @proofpass/sdk ethers

// Initialize ProofPass client
import { ProofPass } from '@proofpass/sdk';

const proofpass = new ProofPass({
  network: 'calibration',
  rpcUrl: 'https://api.calibration.node.glif.io/rpc/v1'
});`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Common Use Cases</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-gradient-to-r from-emerald-50 to-cyan-50">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Storage Providers</h4>
                          <p className="text-sm text-muted-foreground">
                            Verify client data residency requirements before accepting storage deals
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Compliance Officers</h4>
                          <p className="text-sm text-muted-foreground">
                            Audit and verify jurisdiction compliance for regulatory requirements
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">SDK Documentation</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Complete SDK with TypeScript support, React hooks, and Vue.js composables
                      </p>
                      <div className="flex space-x-4">
                        <Button size="sm" variant="outline" className="glass-button">
                          <FileText className="h-4 w-4 mr-2" />
                          API Docs
                        </Button>
                        <Button size="sm" variant="outline" className="glass-button">
                          <Code className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                        <Button size="sm" variant="outline" className="glass-button">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          NPM Package
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Support Section */}
        <Card className="glass-card mt-12">
          <CardHeader>
            <CardTitle className="text-center">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <BookOpen className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Comprehensive guides and API reference
                </p>
                <Button size="sm" variant="outline" className="glass-button">
                  Browse Docs
                </Button>
              </div>
              
              <div>
                <Users className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Join our developer community on Discord
                </p>
                <Button size="sm" variant="outline" className="glass-button">
                  Join Discord
                </Button>
              </div>
              
              <div>
                <Code className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">GitHub</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  View source code and contribute
                </p>
                <Button size="sm" variant="outline" className="glass-button">
                  View Source
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Docs;