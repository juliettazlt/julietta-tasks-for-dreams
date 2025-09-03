import { HeroCard } from "@/components/HeroCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { useNavigate } from "react-router-dom";

// Mock data for the landing page demo
const mockMilestones = [
  { id: 1, title: "Pet a capybara", threshold: 50 },
  { id: 2, title: "Get yoga teacher certification", threshold: 100 },
  { id: 3, title: "Learn to sew and make clothes", threshold: 300 },
  { id: 4, title: "Travel to visit friends worldwide", threshold: 500 },
  { id: 5, title: "Move to NYC", threshold: 750 },
  { id: 6, title: "Embrace bravery and curiosity", threshold: 1000 },
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
                totalRaised={250}
                goal={1000}
                helpersCount={12}
                onDonate={handleDonate}
              />
          </div>

          {/* Right Sidebar - Milestones Only */}
          <div className="space-y-6">
            <MilestoneCard 
              milestones={mockMilestones}
              currentAmount={250}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
