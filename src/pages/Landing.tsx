import { HeroCard } from "@/components/HeroCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { useNavigate } from "react-router-dom";

// Mock data for the landing page demo
const mockMilestones = [
  { id: 1, title: "Capybara Cafe Visit", threshold: 100, unlocked: true, current: false },
  { id: 2, title: "Omakase Experience", threshold: 300, unlocked: false, current: true },
  { id: 3, title: "New Jeans Shopping", threshold: 500, unlocked: false, current: false },
  { id: 4, title: "Zoo Adventure", threshold: 750, unlocked: false, current: false },
  { id: 5, title: "Amsterdam Trip", threshold: 1000, unlocked: false, current: false },
];

const Landing = () => {
  const navigate = useNavigate();

  const handleDonate = () => {
    // Redirect to auth page when "Start Helping" is clicked
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Hero Card */}
          <div className="lg:col-span-2">
            <HeroCard 
              totalRaised={265}
              goal={1000}
              helpersCount={12}
              onDonate={handleDonate}
            />
          </div>

          {/* Right Sidebar - Milestones Only */}
          <div className="space-y-6">
            <MilestoneCard 
              milestones={mockMilestones}
              currentAmount={265}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
