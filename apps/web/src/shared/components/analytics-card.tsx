import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  note: string;
  icon?: React.ReactNode;
  badgeValue?: string;
  badgeColor?: "green" | "red" | "blue";
}

const badgeColorMap = {
  green: "bg-green-500/10 text-green-500",
  red: "bg-red-500/10 text-red-500",
  blue: "bg-blue-500/10 text-blue-500",
};

export function AnalyticsCard({
  title,
  value,
  note,
  icon,
  badgeValue,
  badgeColor = "green",
}: AnalyticsCardProps) {
  return (
    <Card className="text-muted-foreground p-4">
      <CardContent className="space-y-4">
        {/* Icon + Header */}
        <div className="flex items-start justify-between">
          <div className="text-2xl text-foreground">{icon}</div>
          {badgeValue && (
            <span
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                badgeColorMap[badgeColor]
              )}
            >
              {badgeValue}
            </span>
          )}
        </div>

        {/* Title + Value */}
        <div>
          <p className="text-sm font-medium">{title}</p>
          <h2 className="text-2xl font-bold text-foreground">{value}</h2>
        </div>

        <p className="text-sm text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}
