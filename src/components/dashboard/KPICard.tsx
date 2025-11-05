import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  prefix?: string;
  suffix?: string;
}

export const KPICard = ({ title, value, icon: Icon, trend, prefix = "", suffix = "" }: KPICardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg border-border/50 bg-gradient-to-br from-card to-card/95">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">
          {prefix}{typeof value === 'number' ? value.toLocaleString('fr-FR') : value}{suffix}
        </div>
        {trend && (
          <p className={`text-xs mt-2 flex items-center gap-1 ${trend.isPositive ? 'text-accent' : 'text-destructive'}`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
            <span className="text-muted-foreground">vs mois dernier</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};
