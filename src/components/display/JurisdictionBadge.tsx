import { Badge } from "@/components/ui/badge";

interface JurisdictionBadgeProps {
  country: string;
  region?: string;
}

export const JurisdictionBadge = ({ country, region }: JurisdictionBadgeProps) => {
  return (
    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
      {country} {region && `→ ${region}`}
    </Badge>
  );
};
