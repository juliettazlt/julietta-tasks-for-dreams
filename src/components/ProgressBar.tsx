import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  goal: number;
  className?: string;
}

export const ProgressBar = ({ current, goal, className }: ProgressBarProps) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const remaining = Math.max(goal - current, 0);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">
          ${current.toLocaleString()} raised
        </span>
        <span className="text-sm text-muted-foreground">
          ${remaining.toLocaleString()} to go
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-3 bg-muted"
      />
      <div className="text-xs text-center text-muted-foreground">
        {percentage.toFixed(1)}% complete
      </div>
    </div>
  );
};