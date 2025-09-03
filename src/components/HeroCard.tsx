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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Using your converted JPEG images from the public folder
  const images = [
    '/IMG_7124.jpeg',
    '/IMG_7144.jpeg',
    '/IMG_7146.jpeg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const progress = Math.min((totalRaised / goal) * 100, 100);

  return (
    <Card className="clean-card overflow-hidden relative">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Birthday celebration ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

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
            className="clean-button bg-white text-orange-600 hover:bg-gray-100 shadow-lg"
          >
            🎁 Start Helping
          </Button>
          <p className="text-xs text-white/70 mt-3">
            Complete tasks to donate symbolic dollars - no real money involved
          </p>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};