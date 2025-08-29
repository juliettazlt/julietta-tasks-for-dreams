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
    <Card className="overflow-hidden shadow-celebration bg-gradient-card">
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Birthday celebration with confetti and balloons" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground">
          No Real Money Collected
        </Badge>
      </div>

      <CardContent className="p-8 space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            🎂 Help Celebrate Julietta's Birthday!
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete daily tasks to donate symbolic dollars toward her birthday dreams
          </p>
        </div>

        {/* Progress Section */}
        <ProgressBar current={totalRaised} goal={goal} />

        {/* Stats */}
        <div className="flex justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">
              ${totalRaised.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">raised</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {helpersCount}
            </div>
            <div className="text-sm text-muted-foreground">helpers</div>
          </div>
        </div>

        {/* Donate Button */}
        <div className="text-center">
          <Button 
            variant="donate" 
            size="lg" 
            onClick={onDonate}
            className="px-12 py-4"
          >
            🎁 Start Helping
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Complete tasks to donate symbolic dollars - no real money involved
          </p>
        </div>
      </CardContent>
    </Card>
  );
};