import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface PDPStatusProps {
  isFresh: boolean;
}

export const PDPStatus = ({ isFresh }: PDPStatusProps) => {
  return (
    <Badge className={isFresh ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}>
      <Clock className="h-3 w-3 mr-1" />
      {isFresh ? "Fresh" : "Stale"}
    </Badge>
  );
};
