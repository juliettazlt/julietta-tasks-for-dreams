import { useState, useEffect } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    '/IMG_7124.jpeg',
    '/IMG_7144.jpeg',
    '/IMG_7146.jpeg'
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images.length, isHovered]);

  const progress = Math.min((totalRaised / goal) * 100, 100);

  return (
    <Card 
      className="clean-card overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel Section */}
      <div className="relative h-64 overflow-hidden">
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
              onError={(e) => {
                console.error('Image failed to load:', image);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ))}
        
        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
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
      </div>

      {/* Content Section */}
      <CardContent className="p-6 space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            🎂 Help Celebrate Julietta's Birthday!
          </h1>
          <p className="text-gray-600">
            Complete daily tasks to donate symbolic dollars toward her birthday dreams
          </p>
        </div>

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
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

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