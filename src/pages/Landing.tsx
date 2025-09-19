import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/ui/animated-counter";
import { 
  Shield, 
  CheckCircle, 
  Zap, 
  Lock, 
  FileCheck, 
  Globe,
  ArrowRight,
  Sparkles,
  Database,
  Key,
  Clock,
  Award,
  Users,
  TrendingUp
} from "lucide-react";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Lock,
      title: "Soulbound NFTs",
      description: "Non-transferable residency passes with cryptographic security",
      gradient: "from-emerald-400 to-cyan-400"
    },
    {
      icon: Database,
      title: "PDP Monitoring", 
      description: "Real-time data freshness verification with 24h guarantees",
      gradient: "from-cyan-400 to-blue-400"
    },
    {
      icon: Key,
      title: "Cryptographic Proofs",
      description: "ECDSA signature verification for tamper-proof attestation",
      gradient: "from-blue-400 to-purple-400"
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Sub-second jurisdiction checking with blockchain finality",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      icon: FileCheck,
      title: "Notary Attestation",
      description: "Trusted notary signature validation and compliance checking",
      gradient: "from-pink-400 to-red-400"
    },
    {
      icon: Globe,
      title: "SP Compliance",
      description: "Storage provider jurisdiction verification and monitoring",
      gradient: "from-red-400 to-orange-400"
    },
    {
      icon: TrendingUp,
      title: "Fee Sustainability",
      description: "Transparent tFIL fee structure for long-term platform health",
      gradient: "from-orange-400 to-yellow-400"
    },
    {
      icon: Award,
      title: "OpenZeppelin Security",
      description: "Battle-tested contract standards with audit-grade security",
      gradient: "from-yellow-400 to-emerald-400"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Submit Documents",
      description: "Upload jurisdiction compliance documents with privacy protection",
      icon: FileCheck
    },
    {
      number: 2,
      title: "Notary Verification",
      description: "Cryptographic signature validation by trusted notary network",
      icon: CheckCircle
    },
    {
      number: 3,
      title: "Receive Soulbound Pass",
      description: "Get your non-transferable NFT with verifiable residency proof",
      icon: Shield
    }
  ];

  const trustLogos = [
    { name: "Filecoin", description: "Built on Filecoin" },
    { name: "OpenZeppelin", description: "Audited Contracts" },
    { name: "ERC-721", description: "Standard Compliant" },
    { name: "WCAG AA", description: "Accessible Design" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-emerald-500/5 to-cyan-500/5 particle-bg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/10 animate-gradient" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Badge */}
            <div className={`inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8 transition-all duration-1000 ${isVisible ? 'animate-bounce-in' : 'opacity-0'}`}>
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Try Pass ID: 1</span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
            </div>

            {/* Hero Headline */}
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
              <span className="gradient-text">Verifiable Data</span>
              <br />
              <span className="text-foreground">Residency, Instantly</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
              Cryptographically prove jurisdiction compliance on{" "}
              <span className="text-emerald-400 font-semibold">Filecoin</span> with 
              soulbound NFTs and zero-knowledge proofs
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'}`}>
              <Link to="/verify">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 text-lg press-scale hover-glow">
                  <Shield className="mr-2 h-5 w-5" />
                  Verify Pass ID 1
                </Button>
              </Link>
              <Link to="/prove">
                <Button size="lg" variant="outline" className="glass-button font-semibold px-8 py-4 text-lg press-scale hover-glow-cyan">
                  Issue New Pass
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Live Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                  <AnimatedCounter end={5} suffix=" tFIL" />
                </div>
                <div className="text-sm text-muted-foreground">Pass Issuance Fee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  <AnimatedCounter end={2} suffix=" Checks" />
                </div>
                <div className="text-sm text-muted-foreground">PDP Verifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                  <AnimatedCounter end={24} suffix="h" />
                </div>
                <div className="text-sm text-muted-foreground">Freshness Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Soulbound Security</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise-Grade <span className="gradient-text">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge blockchain technology and cryptographic proofs
              for uncompromising security and compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className={`glass-card hover:scale-105 transition-all duration-300 group animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:animate-pulse`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-emerald-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to cryptographically prove your data residency
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={step.number}
                    className={`text-center animate-fade-in`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mb-4 animate-float">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-400/50 to-cyan-400/50 -translate-x-10" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-background border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-muted-foreground">
              Trusted by Industry Standards
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustLogos.map((logo, index) => (
              <div 
                key={logo.name}
                className={`text-center group animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-emerald-500/5 group-hover:from-primary/10 group-hover:to-emerald-500/10 transition-all duration-300 mb-3">
                  <Award className="h-8 w-8 text-emerald-400 mx-auto" />
                </div>
                <div className="font-semibold text-foreground mb-1">{logo.name}</div>
                <div className="text-xs text-muted-foreground">{logo.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-emerald-500 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-cyan-500/90" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join the future of verifiable data residency. Try our demo with Pass ID 1 
            or issue your own pass in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/verify">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 text-lg press-scale">
                <Shield className="mr-2 h-5 w-5" />
                Try Demo Now
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg press-scale">
                View Documentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;