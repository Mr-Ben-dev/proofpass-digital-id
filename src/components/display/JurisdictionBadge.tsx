import { Badge } from "@/components/ui/badge";
import { ENV } from "@/config/environment";

interface JurisdictionBadgeProps {
  region?: string;
}

export const JurisdictionBadge = ({ region }: JurisdictionBadgeProps) => {
  return (
    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
      {ENV.JURISDICTION.COUNTRY} {region && `→ ${region}`}
    </Badge>
  );
};
