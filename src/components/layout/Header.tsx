import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, Wallet, Globe } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Prove", href: "/prove" },
    { name: "Verify", href: "/verify" },
    { name: "Contracts", href: "/contracts" },
    { name: "Docs", href: "/docs" },
  ];

  const isActive = (href: string) => location.pathname === href;

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
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-emerald-400 ${
                  isActive(item.href)
                    ? "text-emerald-400 border-b-2 border-emerald-400"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Network Status */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Globe className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Calibration (314159)</span>
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Mock Wallet Connection */}
            <Button variant="outline" className="glass-button press-scale hover-glow border-white/[0.1] text-foreground hover:text-emerald-400">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/[0.08]">
              <Button variant="outline" className="w-full glass-button border-white/[0.1] text-foreground hover:text-emerald-400">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;