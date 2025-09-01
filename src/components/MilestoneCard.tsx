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
    <Card className="clean-card">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-900">🎯 Birthday Goals</h3>
        <div className="space-y-4">
          {milestones.map((milestone) => {
            const isUnlocked = currentAmount >= milestone.threshold;
            const isCurrent = !isUnlocked && (milestone.id === 1 || currentAmount >= milestones[milestone.id - 2]?.threshold);
            
            return (
              <div 
                key={milestone.id}
                className={`floating-card p-4 ${
                  isUnlocked 
                    ? 'bg-orange-500 text-white' 
                    : isCurrent
                    ? 'bg-gray-100 text-gray-900 border-2 border-orange-200'
                    : 'bg-gray-50 text-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm flex-1">
                    {isUnlocked ? '✅' : isCurrent ? '🎯' : '🔒'} {milestone.title}
                  </span>
                  <Badge className={`text-xs ${
                    isUnlocked 
                      ? 'bg-white/20 text-white border-white/30' 
                      : isCurrent
                      ? 'bg-orange-100 text-orange-700 border-orange-200'
                      : 'bg-gray-200 text-gray-500 border-gray-300'
                  }`}>
                    ${milestone.threshold.toLocaleString()}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};