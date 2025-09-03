import { useState, useEffect } from "react";
import { HeroCard } from "@/components/HeroCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { useNavigate } from "react-router-dom";
import { UserProgressService } from "@/integrations/supabase/userProgress";

// Mock data for the landing page demo
const mockMilestones = [
  { id: 1, title: "Pet a capybara", threshold: 50 },
  { id: 2, title: "Be brave and curious", threshold: 100 },
  { id: 3, title: "Learn to sew and make clothes", threshold: 300 },
  { id: 4, title: "Travel to visit at least 3 friends", threshold: 500 },
  { id: 5, title: "Get yoga teacher certification", threshold: 750 },
  { id: 6, title: "Move to NYC", threshold: 1000 },
];

const Landing = () => {
  const navigate = useNavigate();
  const [totalRaised, setTotalRaised] = useState(50);
  const [helpersCount, setHelpersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFundraiserData();
  }, []);

  const loadFundraiserData = async () => {
    try {
      setIsLoading(true);
      
      // Get total points from all users
      const totalPoints = await UserProgressService.getTotalPoints();
      setTotalRaised(50 + totalPoints); // Base 50 + user contributions
      
      // Get count of unique users who have contributed
      const helpersCount = await UserProgressService.getHelpersCount();
      setHelpersCount(helpersCount);
      
    } catch (error) {
      console.error('Error loading fundraiser data:', error);
      // Fallback to default values
      setTotalRaised(50);
      setHelpersCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonate = () => {
    // Redirect to auth page when "Start Helping" is clicked
    navigate('/auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fundraiser data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Hero Card */}
          <div className="lg:col-span-2">
            <HeroCard 
              totalRaised={totalRaised}
              goal={1000}
              helpersCount={helpersCount}
              onDonate={handleDonate}
            />
          </div>

          {/* Right Sidebar - Milestones Only */}
          <div className="space-y-6">
            <MilestoneCard 
              milestones={mockMilestones}
              currentAmount={totalRaised}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
