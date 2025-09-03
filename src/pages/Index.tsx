import { useState, useRef, useEffect } from "react";
import { HeroCard } from "@/components/HeroCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { TaskCard } from "@/components/TaskCard";
import { TodoList } from "@/components/TodoList";
import { UnlockAnimation } from "@/components/UnlockAnimation";
import { RecentHelpersCard } from "@/components/RecentHelpersCard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProgressService } from "@/integrations/supabase/userProgress";
import { toast } from "sonner";

// Mock data for the dashboard
const mockMilestones = [
  { id: 1, title: "Pet a capybara", threshold: 50 },
  { id: 2, title: "Be brave and curious", threshold: 100 },
  { id: 3, title: "Learn to sew and make clothes", threshold: 300 },
  { id: 4, title: "Travel to visit at least 3 friends", threshold: 500 },
  { id: 5, title: "Get yoga teacher certification", threshold: 750 },
  { id: 6, title: "Move to NYC", threshold: 1000 },
];

const initialTasks = [
  { 
    id: 1, 
    title: "Daily Run", 
    description: "Complete your daily run to unlock other tasks", 
    points: 50, 
    completed: false, 
    cooldown: "once/day",
    isGatekeeper: true,
    isLocked: false,
    type: 'run' as const
  },
  { 
    id: 2, 
    title: "Selfie", 
    description: "Send a post-workout selfie to Julietta", 
    points: 50, 
    completed: false, 
    cooldown: "once/day",
    isLocked: true,
    type: 'selfie' as const
  },
  { 
    id: 3, 
    title: "Mood Check", 
    description: "Log your mood for the day", 
    points: 50, 
    completed: false, 
    cooldown: "once/day",
    isLocked: true,
    type: 'mood' as const
  },
  { 
    id: 4, 
    title: "Add Personal To-do", 
    description: "Add one item to your personal to-do list", 
    points: 50, 
    completed: false, 
    cooldown: "once/day",
    isLocked: true,
    type: 'todo' as const
  },
  { 
    id: 5, 
    title: "Log Today's Weather", 
    description: "What's the weather like where you are?", 
    points: 50, 
    completed: false, 
    cooldown: "once/day",
    isLocked: true,
    type: 'weather' as const
  },
];

const mockTodos = [
  { id: 1, title: "Call mom", completed: false },
  { id: 2, title: "Buy groceries", completed: true },
  { id: 3, title: "Read a book", completed: false },
];

const Index = () => {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);
  const [totalPoints, setTotalPoints] = useState(50);
  const [userPoints, setUserPoints] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const tasksSectionRef = useRef<HTMLDivElement>(null);

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Load user progress
      const userProgress = await UserProgressService.getUserProgress(user!.id);
      setUserPoints(userProgress.total_points);
      setUserName(userProgress.name);
      
      // Load completed tasks
      const completedTasks = await UserProgressService.getCompletedTasks(user!.id);
      const completedIds = completedTasks.map(task => task.task_id);
      setCompletedTaskIds(completedIds);
      
      // Update tasks with completion status
      setTasks(prevTasks => 
        prevTasks.map(task => ({
          ...task,
          completed: completedIds.includes(task.id)
        }))
      );
      
      // Load total points across all users
      const totalPoints = await UserProgressService.getTotalPoints();
      setTotalPoints(50 + totalPoints); // Base 50 + user contributions
      
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonate = () => {
    // Scroll to the tasks section
    if (tasksSectionRef.current) {
      tasksSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleTaskComplete = async (taskId: number) => {
    if (!user) return;

    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      // Complete task in backend
      await UserProgressService.completeTask(user.id, taskId, task.points, userName || undefined);
      
      // Update local state
      setTasks(prevTasks => 
        prevTasks.map(t => {
          if (t.id === taskId) {
            return { ...t, completed: true };
          } else if (t.isLocked && taskId === 1) {
            // If run task (id: 1) was completed, unlock other tasks
            return { ...t, isLocked: false };
          }
          return t;
        })
      );

      setCompletedTaskIds(prev => [...prev, taskId]);
      setUserPoints(prev => prev + task.points);
      setTotalPoints(prev => prev + task.points);

      // Show unlock animation if run task was completed
      if (taskId === 1) {
        setShowUnlockAnimation(true);
      }

      toast.success(`🎉 Task completed! +$${task.points} donated to Julietta's birthday dreams!`);

    } catch (error) {
      if (error instanceof Error && error.message === 'Task already completed') {
        toast.error('This task has already been completed');
      } else {
        console.error('Error completing task:', error);
        toast.error('Failed to complete task');
      }
    }
  };

  const handleUnlockAnimationComplete = () => {
    setShowUnlockAnimation(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with user info and sign out */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold">
              Welcome back{userName ? `, ${userName}` : ''}!
            </h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <p className="text-sm text-orange-600">Your contribution: ${userPoints}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Card */}
            <HeroCard 
              totalRaised={totalPoints}
              goal={1000}
              helpersCount={12}
              onDonate={handleDonate}
            />

            {/* Tasks and Todos Tabs */}
            <div ref={tasksSectionRef}>
              <Card>
                <CardHeader>
                  <CardTitle>Your Tasks & Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="tasks" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
                      <TabsTrigger value="todos">Personal To-dos</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="tasks" className="space-y-4">
                      <div className="grid gap-4">
                        {tasks.map((task) => (
                          <TaskCard 
                            key={task.id} 
                            task={task} 
                            onTaskComplete={handleTaskComplete}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="todos">
                      <TodoList todos={mockTodos} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <MilestoneCard 
              milestones={mockMilestones}
              currentAmount={totalPoints}
            />
            <RecentHelpersCard />
          </div>
        </div>

        {/* Unlock Animation */}
        <UnlockAnimation 
          isVisible={showUnlockAnimation}
          onAnimationComplete={handleUnlockAnimationComplete}
        />
      </div>
    </div>
  );
};

export default Index;
