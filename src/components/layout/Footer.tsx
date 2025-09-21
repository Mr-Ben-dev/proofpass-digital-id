import { Button } from "@/components/ui/button";
import { ENV } from "@/config/environment";
import { useToast } from "@/hooks/use-toast";
import { contracts } from "@/utils/constants";
import { Copy, ExternalLink, Github, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { toast } = useToast();

  const contractAddresses = [
    {
      name: "NotaryRegistry",
      address: contracts.NotaryRegistry,
    },
    {
      name: "SPJurisdiction", 
      address: contracts.SPJurisdiction,
    },
    {
      name: "ResidencyPass",
      address: contracts.ResidencyPass,
    },
  ];

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${name} address copied to clipboard`,
    });
  };

  return (
    <footer className="bg-primary/5 border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-emerald-500" />
              <span className="text-2xl font-bold gradient-text">ProofPass</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Verifiable data residency platform built on Filecoin Calibration testnet. 
              Cryptographically prove jurisdiction compliance with soulbound NFTs.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="glass-button">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <div className="text-xs text-muted-foreground">
                Built for Filecoin Hackathon 2025
              </div>
            </div>
          </div>

          {/* Contract Addresses */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Smart Contracts</h3>
            <div className="space-y-3">
              {contractAddresses.map((contract) => (
                <div key={contract.name} className="text-sm">
                  <div className="font-medium text-foreground mb-1">{contract.name}</div>
                  <div className="flex items-center space-x-2 group">
                    <code className="text-xs text-muted-foreground font-mono bg-primary/5 px-2 py-1 rounded">
                      {contract.address.slice(0, 10)}...{contract.address.slice(-8)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(contract.address, contract.name)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <a
                      href={`${ENV.EXPLORER_BASE}/address/${contract.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center"
                    >
                      <ExternalLink className="h-3 w-3 text-cyan-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <div className="space-y-2 text-sm">
              <Link to="/docs" className="block text-muted-foreground hover:text-emerald-400 transition-colors">
                Documentation
              </Link>
              <a 
                href="https://api.calibration.node.glif.io/rpc/v1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-emerald-400 transition-colors"
              >
                RPC Endpoint
              </a>
              <a 
                href={ENV.EXPLORER_BASE} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-emerald-400 transition-colors"
              >
                Block Explorer
              </a>
              <Link to="/contracts" className="block text-muted-foreground hover:text-emerald-400 transition-colors">
                Contract Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 ProofPass. Built with React, TypeScript, Filecoin, and OpenZeppelin.
            </div>
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <span>Chain ID: 314159</span>
              <span>Demo Pass ID: 1</span>
              <span className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live on Testnet</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;