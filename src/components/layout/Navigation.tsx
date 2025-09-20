import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Prove", href: "/prove" },
  { name: "Verify", href: "/verify" },
  { name: "Contracts", href: "/contracts" },
  { name: "Docs", href: "/docs" },
];

export const Navigation = () => {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;

  return (
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
  );
};

export const MobileNavigation = ({ onLinkClick }: { onLinkClick: () => void }) => {
    const location = useLocation();
    const isActive = (href: string) => location.pathname === href;

    return (
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
                onClick={onLinkClick}
              >
                {item.name}
              </Link>
            ))}
        </div>
    )
}
