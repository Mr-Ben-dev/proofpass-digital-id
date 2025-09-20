import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContractCardProps {
  name: string;
  address: string;
  description: string;
  abi: any[];
  icon: React.ElementType;
}

export const ContractCard = ({ name, address, description, abi, icon: Icon }: ContractCardProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard`,
    });
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <CardTitle>{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <code className="text-xs font-mono">
            {address.slice(0, 10)}...{address.slice(-8)}
          </code>
          <div className="flex space-x-1">
            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(address, `${name} address`)}>
              <Copy className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => window.open(`https://calibration.filfox.info/en/address/${address}`, '_blank')}>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Functions</div>
          <div className="flex flex-wrap gap-1">
            {abi
              .filter((item) => item.type === "function")
              .map((func) => (
                <Badge key={func.name} variant="outline" className="text-xs">
                  {func.name}
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
