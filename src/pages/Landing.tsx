import AnimatedCounter from "@/components/animations/AnimatedCounter";
import Typewriter from "@/components/animations/Typewriter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetNotaryCount } from "@/hooks/useNotaryRegistry";
import { fadeIn, scaleButton, staggerContainer, staggerItem } from "@/utils/motionPresets";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle,
  Database,
  FileCheck,
  Globe,
  Key,
  Lock,
  Shield,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const { data: notaryCount } = useGetNotaryCount();

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
    <motion.div
      className="min-h-screen premium-bg"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden neural-network">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-emerald-500/10 animate-gradient" />
        
        <motion.div
          className="relative container mx-auto px-4 py-20 md:py-32"
          variants={staggerContainer}
        >
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Badge */}
            <motion.div variants={staggerItem} className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Try Pass ID: 1</span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
            </motion.div>

            {/* Hero Headline */}
            <motion.div variants={staggerItem} className="text-4xl md:text-5xl font-bold mb-6 h-24 md:h-48 flex items-center justify-center">
                <Typewriter text="Verifiable Data Residency, Instantly" className="gradient-text" />
            </motion.div>

            {/* Subtitle */}
            <motion.p variants={staggerItem} className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Cryptographically prove jurisdiction compliance on{" "}
              <span className="text-emerald-400 font-semibold">Filecoin</span> with
              soulbound NFTs and zero-knowledge proofs
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Link to="/verify?passId=1">
                <motion.div variants={scaleButton} whileHover="hover" whileTap="tap">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 text-lg">
                    <Shield className="mr-2 h-5 w-5" />
                    Verify Pass ID 1 to 20
                  </Button>
                </motion.div>
              </Link>
              <Link to="/prove">
                <motion.div variants={scaleButton} whileHover="hover" whileTap="tap">
                  <Button size="lg" variant="outline" className="glass-button font-semibold px-8 py-4 text-lg">
                    Issue New Pass
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Live Stats */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div variants={staggerItem} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                  <AnimatedCounter value={5} postfix=" tFIL" />
                </div>
                <div className="text-sm text-muted-foreground">Pass Issuance Fee</div>
              </motion.div>
              <motion.div variants={staggerItem} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  <AnimatedCounter value={notaryCount ? Number(notaryCount) : 0} />
                </div>
                <div className="text-sm text-muted-foreground">Registered Notaries</div>
              </motion.div>
              <motion.div variants={staggerItem} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                  <AnimatedCounter value={24} postfix="h" />
                </div>
                <div className="text-sm text-muted-foreground">Freshness Guarantee</div>
              </motion.div>
              <motion.div variants={staggerItem} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">
                  <AnimatedCounter value={100} postfix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Soulbound Security</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
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

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div variants={staggerItem} key={feature.title}>
                    <Card className="glass-card h-full">
                      <CardContent className="p-6">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}>
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
                </motion.div>
              );
            })}
          </motion.div>
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
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div variants={staggerItem} key={step.number} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mb-4">
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
                  </motion.div>
                );
              })}
            </motion.div>
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
          
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustLogos.map((logo, index) => (
              <motion.div variants={staggerItem} key={logo.name} className="text-center group">
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-emerald-500/5 group-hover:from-primary/10 group-hover:to-emerald-500/10 transition-all duration-300 mb-3">
                  <Award className="h-8 w-8 text-emerald-400 mx-auto" />
                </div>
                <div className="font-semibold text-foreground mb-1">{logo.name}</div>
                <div className="text-xs text-muted-foreground">{logo.description}</div>
              </motion.div>
            ))}
          </motion.div>
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
            <Link to="/verify?passId=1">
              <motion.div variants={scaleButton} whileHover="hover" whileTap="tap">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
                  <Shield className="mr-2 h-5 w-5" />
                  Try Demo Now
                </Button>
              </motion.div>
            </Link>
            <Link to="/docs">
              <motion.div variants={scaleButton} whileHover="hover" whileTap="tap">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg">
                  View Documentation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Landing;
