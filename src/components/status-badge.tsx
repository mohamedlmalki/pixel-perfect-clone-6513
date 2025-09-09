import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: "deliverable" | "invalid" | "unknown" | "processing";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    deliverable: {
      icon: CheckCircle,
      className: "bg-success/20 text-success border-success/30",
      label: "Deliverable"
    },
    invalid: {
      icon: XCircle,
      className: "bg-destructive/20 text-destructive border-destructive/30",
      label: "Invalid"
    },
    unknown: {
      icon: AlertCircle,
      className: "bg-warning/20 text-warning border-warning/30",
      label: "Unknown"
    },
    processing: {
      icon: Clock,
      className: "bg-primary/20 text-primary border-primary/30 animate-pulse",
      label: "Processing"
    }
  };

  const variant = variants[status];
  const Icon = variant.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105",
      variant.className,
      className
    )}>
      <Icon className="w-3 h-3" />
      {variant.label}
    </div>
  );
}