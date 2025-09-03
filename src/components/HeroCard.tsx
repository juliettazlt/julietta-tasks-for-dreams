import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HeroCardProps {
  totalRaised: number;
  goal: number;
  helpersCount: number;
  onDonate: () => void;
}

export const HeroCard = ({ totalRaised, goal, helpersCount, onDonate }: HeroCardProps) => {
  const progress = Math.min((totalRaised / goal) * 100, 100);

  return (
    <Card className="clean-card overflow-hidden relative">
      {/* Single Image Background */}
      <div className="absolute inset-0">
        <img
          src="/IMG_7124.jpeg"
          alt="Julietta's Birthday Celebration"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <CardContent className="p-6 space-y-6 relative z-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-white">
            🎂 Help Celebrate Julietta's Birthday!
          </h1>
          <p className="text-white/90">
            Complete daily tasks to donate symbolic dollars toward her birthday dreams
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white/90">Progress</span>
            <span className="text-sm text-white/80">
              ${totalRaised.toLocaleString()} of ${goal.toLocaleString()}
            </span>
          </div>
          <div className="progress-clean bg-white/20">
            <div 
              className="progress-fill-clean bg-white" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-12 text-center">
          <div>
            <div className="text-2xl font-bold text-white">
              ${totalRaised.toLocaleString()}
            </div>
            <div className="text-sm text-white/80">raised</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {helpersCount}
            </div>
            <div className="text-sm text-white/80">helpers</div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={onDonate}
            className="clean-button bg-white text-gray-800 hover:bg-gray-100 shadow-lg"
          >
            🎁 Start Helping
          </Button>
          <p className="text-xs text-white/70 mt-3">
            Complete tasks to donate symbolic dollars - no real money involved
          </p>
        </div>
      </CardContent>
    </Card>
  );
};