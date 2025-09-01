import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Milestone {
  id: number;
  title: string;
  threshold: number;
  unlocked: boolean;
  current?: boolean;
}

interface MilestoneCardProps {
  milestones: Milestone[];
  currentAmount: number;
}

export const MilestoneCard = ({ milestones, currentAmount }: MilestoneCardProps) => {
  return (
    <Card className="shadow-card bg-gradient-card">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">🎂 Help Make Julietta's 24th Birthday Dreams Come True!</h3>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div 
              key={milestone.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-smooth ${
                milestone.unlocked 
                  ? 'bg-secondary text-secondary-foreground' 
                  : milestone.current
                  ? 'bg-primary/10 border border-primary/20'
                  : 'bg-muted/50 opacity-60 blur-[1px]'
              }`}
            >
              <span className={`font-medium ${
                milestone.unlocked ? '' : milestone.current ? 'text-primary' : ''
              }`}>
                {milestone.unlocked ? '✅' : milestone.current ? '🎯' : '🔒'} {milestone.title}
              </span>
              <Badge variant={milestone.unlocked ? 'default' : 'secondary'}>
                ${milestone.threshold.toLocaleString()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};