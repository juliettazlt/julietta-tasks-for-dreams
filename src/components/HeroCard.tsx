import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "./ProgressBar";

interface HeroCardProps {
  totalRaised: number;
  goal: number;
  helpersCount: number;
  onDonate: () => void;
}

export const HeroCard = ({ totalRaised, goal, helpersCount, onDonate }: HeroCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Using your converted JPEG images from the public folder
  const images = [
    '/IMG_7124.jpeg',
    '/IMG_7144.jpeg',
    '/IMG_7146.jpeg'
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length, isHovered]);

  const progress = Math.min((totalRaised / goal) * 100, 100);

  return (
    <Card
      className="clean-card overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay for text readability */}

      <CardContent className="p-6 space-y-6 relative z-10 text-white">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">🎂 Help Celebrate Julietta's Birthday!</h1>
          <p className="text-gray-200">Complete daily tasks to donate symbolic dollars toward her birthday dreams</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-100">Progress</span>
            <span className="text-sm text-gray-200">${totalRaised.toLocaleString()} of ${goal.toLocaleString()}</span>
          </div>
          <div className="progress-clean bg-white/30">
            <div className="progress-fill-clean bg-white" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="flex justify-center gap-12 text-center">
          <div>
            <div className="text-2xl font-bold">${totalRaised.toLocaleString()}</div>
            <div className="text-sm text-gray-200">raised</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{helpersCount}</div>
            <div className="text-sm text-gray-200">helpers</div>
          </div>
        </div>
        <div className="text-center">
          <Button onClick={onDonate} className="clean-button bg-white text-orange-600 hover:bg-gray-100 shadow-lg">🎁 Start Helping</Button>
          <p className="text-xs text-gray-300 mt-3">Complete tasks to donate symbolic dollars - no real money involved</p>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};