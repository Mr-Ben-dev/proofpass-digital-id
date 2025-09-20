import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCounter from "@/components/animations/AnimatedCounter";

interface StatsCardProps {
  title: string;
  value: number;
  prefix?: string;
  postfix?: string;
  icon: React.ElementType;
}

export const StatsCard = ({ title, value, prefix, postfix, icon: Icon }: StatsCardProps) => {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <AnimatedCounter value={value} prefix={prefix} postfix={postfix} />
        </div>
      </CardContent>
    </Card>
  );
};
