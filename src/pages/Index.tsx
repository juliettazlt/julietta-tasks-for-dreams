import { HeroCard } from "@/components/HeroCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { LeaderboardCard } from "@/components/LeaderboardCard";

// Mock data for the landing page demo
const mockMilestones = [
  { id: 1, title: "Capybara Cafe Visit", threshold: 100, unlocked: true, current: false },
  { id: 2, title: "Omakase Experience", threshold: 300, unlocked: false, current: true },
  { id: 3, title: "New Jeans Shopping", threshold: 500, unlocked: false, current: false },
  { id: 4, title: "Zoo Adventure", threshold: 750, unlocked: false, current: false },
  { id: 5, title: "Amsterdam Trip", threshold: 1000, unlocked: false, current: false },
];

const mockTopHelpers = [
  { nickname: "sarah_j", points: 120, rank: 1 },
  { nickname: "mike_runner", points: 95, rank: 2 },
  { nickname: "yoga_anna", points: 80, rank: 3 },
  { nickname: "tom_hikes", points: 65, rank: 4 },
];

const mockRecentActivity = [
  { nickname: "sarah_j", task: "Morning Run", points: 10, timeAgo: "2 min ago" },
  { nickname: "mike_runner", task: "Selfie", points: 10, timeAgo: "5 min ago" },
  { nickname: "yoga_anna", task: "Mood Check", points: 10, timeAgo: "12 min ago" },
  { nickname: "tom_hikes", task: "Added Todo", points: 10, timeAgo: "15 min ago" },
];

const Index = () => {
  const handleDonate = () => {
    // This would normally open the auth modal or redirect to signup
    alert("🎉 Authentication coming soon! Connect Supabase to enable full functionality.");
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

          {/* Right Sidebar */}
          <div className="space-y-6">
            <MilestoneCard 
              milestones={mockMilestones}
              currentAmount={265}
            />
            <LeaderboardCard 
              topHelpers={mockTopHelpers}
              recentActivity={mockRecentActivity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
