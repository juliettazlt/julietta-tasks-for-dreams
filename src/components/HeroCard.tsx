import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "./ProgressBar";
import heroImage from "@/assets/birthday-hero.jpg";

interface HeroCardProps {
  totalRaised: number;
  goal: number;
  helpersCount: number;
  onDonate: () => void;
}

export const HeroCard = ({ totalRaised, goal, helpersCount, onDonate }: HeroCardProps) => {
  return (
    <Card className="clean-card">
      <CardContent className="p-6 space-y-6">
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            🎂 Help Celebrate Julietta's Birthday!
          </h1>
          <p className="text-gray-600">
            Complete daily tasks to donate symbolic dollars toward her birthday dreams
          </p>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              ${totalRaised.toLocaleString()} of ${goal.toLocaleString()}
            </span>
          </div>
          <div className="progress-clean">
            <div 
              className="progress-fill-clean" 
              style={{ width: `${Math.min((totalRaised / goal) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${totalRaised.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">raised</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {helpersCount}
            </div>
            <div className="text-sm text-gray-500">helpers</div>
          </div>
        </div>

        {/* Donate Button */}
        <div className="text-center">
          <Button 
            onClick={onDonate}
            className="clean-button bg-orange-500 text-white hover:bg-orange-600"
          >
            🎁 Start Helping
          </Button>
          <p className="text-xs text-gray-500 mt-3">
            Complete tasks to donate symbolic dollars - no real money involved
          </p>
        </div>
      </CardContent>
    </Card>
  );
};