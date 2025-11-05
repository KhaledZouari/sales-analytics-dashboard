import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const periods = [
  { label: "7 jours", value: "7d" },
  { label: "30 jours", value: "30d" },
  { label: "3 mois", value: "3m" },
  { label: "1 an", value: "1y" },
];

interface DateRangeFilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export function DateRangeFilter({ selectedPeriod, onPeriodChange }: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Période:</span>
      </div>
      <div className="flex gap-1">
        {periods.map((period) => (
          <Button
            key={period.value}
            variant={selectedPeriod === period.value ? "default" : "outline"}
            size="sm"
            onClick={() => onPeriodChange(period.value)}
            className="text-xs"
          >
            {period.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
