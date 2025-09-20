import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Wallet, Globe } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { Navigation, MobileNavigation } from "./Navigation";
import { useBalance } from "wagmi";
import { formatEther } from "viem";
import { toast } from "sonner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    address,
    isConnected,
    connect,
    connectors,
    disconnect,
    error,
    isPending,
  } = useWallet();
  const { data: balance } = useBalance({ address });

  // Show MetaMask rejection error toast
  if (
    error &&
    error.message &&
    error.message.includes("User denied transaction")
  ) {
    toast.error("MetaMask: You denied the transaction signature.");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] glass-card backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-glow">
            <div className="relative">
              <Shield className="h-8 w-8 text-emerald-400 animate-pulse-glow" />
              <div className="absolute inset-0 h-8 w-8 text-emerald-400/20 animate-ping" />
            </div>
            <span className="text-2xl font-bold gradient-text">ProofPass</span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Network Status */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Globe className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">
                Calibration (314159)
              </span>
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Wallet Connection */}
            {isConnected ? (
              <Button
                onClick={() => disconnect()}
                variant="outline"
                className="glass-button press-scale hover-glow border-white/[0.1] text-foreground hover:text-red-400"
              >
                <Wallet className="h-4 w-4 mr-2" />
                <div className="flex flex-col items-end -space-y-1">
                  <span className="text-xs">
                    {balance
                      ? `${Number(formatEther(balance.value)).toFixed(2)} ${
                          balance.symbol
                        }`
                      : ""}
                  </span>
                  <span className="text-xs">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const injectedConnector = connectors.find(
                    (c) => c.id === "injected"
                  );
                  if (injectedConnector)
                    connect({ connector: injectedConnector });
                }}
                variant="outline"
                className="glass-button press-scale hover-glow border-white/[0.1] text-foreground hover:text-emerald-400"
                disabled={isPending}
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isPending ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div>
            <MobileNavigation onLinkClick={() => setIsMenuOpen(false)} />
            <div className="pt-4 border-t border-white/[0.08]">
              {isConnected ? (
                <Button
                  onClick={() => disconnect()}
                  variant="outline"
                  className="w-full glass-button border-white/[0.1] text-foreground hover:text-red-400"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  <div className="flex flex-col items-center -space-y-1">
                    <span className="text-xs">
                      {balance
                        ? `${Number(formatEther(balance.value)).toFixed(2)} ${
                            balance.symbol
                          }`
                        : ""}
                    </span>
                    <span className="text-xs">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  </div>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const injectedConnector = connectors.find(
                      (c) => c.id === "injected"
                    );
                    if (injectedConnector)
                      connect({ connector: injectedConnector });
                  }}
                  variant="outline"
                  className="w-full glass-button border-white/[0.1] text-foreground hover:text-emerald-400"
                  disabled={isPending}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {isPending ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
