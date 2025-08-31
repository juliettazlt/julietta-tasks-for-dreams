import { useEffect, useState } from "react";
import { CheckCircle, Sparkles } from "lucide-react";

interface UnlockAnimationProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

export const UnlockAnimation = ({ isVisible, onAnimationComplete }: UnlockAnimationProps) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
        onAnimationComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete]);

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 shadow-2xl border-2 border-green-500 animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
              <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-2">
              🎉 Tasks Unlocked!
            </h3>
            <p className="text-muted-foreground">
              Great job on your run! You've unlocked new tasks to help Julietta's birthday dreams come true.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
