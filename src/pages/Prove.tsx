import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileCheck, 
  CreditCard, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Info,
  Sparkles,
  ExternalLink,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Prove = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [passId, setPassId] = useState<string | null>(null);
  const { toast } = useToast();

  const steps = [
    { number: 1, title: "Upload", icon: Upload },
    { number: 2, title: "Policy", icon: FileCheck },
    { number: 3, title: "Pay", icon: CreditCard },
    { number: 4, title: "Pass", icon: Shield }
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate successful pass issuance
    const newPassId = Math.floor(Math.random() * 1000000) + 2;
    setPassId(newPassId.toString());
    setCurrentStep(4);
    setIsLoading(false);

    toast({
      title: "Pass Issued Successfully!",
      description: `Your Residency Pass #${newPassId} has been minted`,
    });
  };

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-cyan-500/5">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Issue Residency Pass</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a cryptographically verifiable proof of data residency 
            with soulbound NFT technology
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : isActive 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-600' 
                        : 'border-gray-300 bg-gray-50 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="ml-3 text-sm">
                    <div className={`font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500'}`}>
                      Step {step.number}
                    </div>
                    <div className="text-gray-400">{step.title}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-6 transition-colors duration-300 ${
                      currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="space-y-8">
          {currentStep === 1 && (
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-6 w-6 text-emerald-500" />
                  <span>Upload Compliance Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-emerald-200 rounded-lg p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                  <div className="text-lg font-medium text-foreground mb-2">
                    Drop your documents here
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                  </div>
                  <Button variant="outline" className="glass-button">
                    Choose Files
                  </Button>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-emerald-800 mb-1">Privacy Protected</div>
                      <div className="text-emerald-700">
                        Documents are processed with privacy-preserving techniques. 
                        Only jurisdiction metadata is stored on-chain.
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setCurrentStep(2)} 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 press-scale hover-glow"
                >
                  Continue to Policy Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="glass-card animate-fade-in">
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
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">🇺🇸 United States</SelectItem>
                        <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                        <SelectItem value="EU">🇪🇺 European Union</SelectItem>
                        <SelectItem value="CH">🇨🇭 Switzerland</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="region">Region (Optional)</Label>
                    <Input placeholder="e.g., California, Ontario" />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-blue-800 mb-1">Compliance Note</div>
                      <div className="text-blue-700">
                        Selected jurisdiction must match your registered Storage Provider attestation 
                        for successful verification.
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setCurrentStep(3)} 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 press-scale hover-glow"
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-6 w-6 text-emerald-500" />
                  <span>Payment & Issuance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Pass Issuance Fee</span>
                    <span className="text-2xl font-bold text-emerald-600">5.0 tFIL</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Base fee:</span>
                      <span>4.5 tFIL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network fee (est.):</span>
                      <span>0.5 tFIL</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>5.0 tFIL</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Network</span>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      Filecoin Calibration (314159)
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Wallet Balance</span>
                    <span className="font-mono">125.8 tFIL</span>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 press-scale hover-glow"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing Transaction...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Confirm & Issue Pass
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && passId && (
            <Card className="glass-card animate-bounce-in">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-emerald-600 mb-2">
                    Pass Issued Successfully!
                  </h2>
                  <p className="text-muted-foreground">
                    Your soulbound residency pass has been minted on Filecoin
                  </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6 mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Your Pass ID</div>
                  <div className="text-4xl font-bold gradient-text mb-4">#{passId}</div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(passId, "Pass ID")}
                      className="glass-button"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy ID
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(`https://proofpass.app/verify?id=${passId}`, "Verification link")}
                      className="glass-button"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full glass-button"
                    onClick={() => window.open(`https://calibration.filfox.info/en/message/${passId}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Filfox Explorer
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => {
                        setCurrentStep(1);
                        setPassId(null);
                      }}
                      variant="outline"
                      className="glass-button"
                    >
                      Issue Another Pass
                    </Button>
                    <Button
                      onClick={() => window.location.href = `/verify?id=${passId}`}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      Verify This Pass
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Advanced Section */}
        {currentStep < 4 && (
          <Card className="glass-card mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Advanced: SP Registration Helper</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                For demonstration purposes - register Storage Provider jurisdiction compliance
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Country Code</Label>
                  <Input placeholder="US" />
                </div>
                <div>
                  <Label>Region</Label>
                  <Input placeholder="California" />
                </div>
              </div>

              <div>
                <Label>Verification CID</Label>
                <Input placeholder="bafy2bzac..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Expiry Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Notary Signature</Label>
                  <Input placeholder="0x..." />
                </div>
              </div>

              <Button variant="outline" className="w-full glass-button">
                Register SP Jurisdiction
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Prove;