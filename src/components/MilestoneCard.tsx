import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Milestone {
  id: number;
  title: string;
  threshold: number;
}

interface MilestoneCardProps {
  milestones: Milestone[];
  currentAmount: number;
}

export const MilestoneCard = ({ milestones, currentAmount }: MilestoneCardProps) => {
  return (
    <Card className="shadow-card bg-gradient-card">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">🎂 Help Make Julietta's Birthday Dreams Come True!</h3>
        <div className="space-y-3">
          {milestones.map((milestone) => {
            const isUnlocked = currentAmount >= milestone.threshold;
            const isCurrent = !isUnlocked && (milestone.id === 1 || currentAmount >= milestones[milestone.id - 2]?.threshold);
            
            return (
              <div 
                key={milestone.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-smooth ${
                  isUnlocked 
                    ? 'bg-secondary text-secondary-foreground' 
                    : isCurrent
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-muted/50 opacity-60 blur-[1px]'
                }`}
              >
                <span className={`font-medium ${
                  isUnlocked ? '' : isCurrent ? 'text-primary' : ''
                }`}>
                  {isUnlocked ? '✅' : isCurrent ? '🎯' : '🔒'} {milestone.title}
                </span>
                <Badge variant={isUnlocked ? 'default' : 'secondary'}>
                  ${milestone.threshold.toLocaleString()}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};