import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps {
  textToCopy: string;
  description: string;
}

export const CopyButton = ({ textToCopy, description }: CopyButtonProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard`,
    });
  };

  return (
    <Button size="sm" variant="ghost" onClick={copyToClipboard}>
      <Copy className="h-3 w-3" />
    </Button>
  );
};
