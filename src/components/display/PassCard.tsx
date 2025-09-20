import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";

interface PassCardProps {
  passId: string;
  jurisdiction: string;
  region: string;
  isFresh: boolean;
  lastChecked: Date;
}

export const PassCard = ({ passId, jurisdiction, region, isFresh, lastChecked }: PassCardProps) => {
  return (
    <Card className="glass-card border-emerald-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-emerald-500" />
            <span className="text-emerald-600">Pass Verified</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              {jurisdiction} &rarr; {region}
            </Badge>
            <Badge className={isFresh ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}>
              <Clock className="h-3 w-3 mr-1" />
              {isFresh ? "Fresh" : "Stale"}
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground">
          Last PDP check: {lastChecked.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-emerald-600">#{passId}</div>
      </CardContent>
    </Card>
  );
};
