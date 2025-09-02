import { useState, useRef, useEffect } from "react";
import { HeroCard } from "@/components/HeroCard";
import { MilestoneCard } from "@/components/MilestoneCard";
import { TaskCard } from "@/components/TaskCard";
import { TodoList } from "@/components/TodoList";
import { UnlockAnimation } from "@/components/UnlockAnimation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProgressService } from "@/integrations/supabase/userProgress";
import { toast } from "sonner";

// Mock data for the dashboard
const mockMilestones = [
  { id: 1, title: "Pet a capybara", threshold: 50 },
  { id: 2, title: "Complete a 200-hour yoga teacher certificate", threshold: 100 },
  { id: 3, title: "Buy a sewing machine and make my own clothes", threshold: 300 },
  { id: 4, title: "Visit all my friends around the US and the world", threshold: 500 },
  { id: 5, title: "Move to NYC :)", threshold: 750 },
  { id: 6, title: "Be brave, be curious", threshold: 1000 },
];

const initialTasks = [
  { 
    id: 1, 
    title: "Daily Run", 
    description: "Complete your daily run to unlock other tasks", 
    points: 10, 
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
    points: 10, 
    completed: false, 
    cooldown: "once/day",
    isLocked: true,
    type: 'selfie' as const
  },
  { 
    id: 3, 
    title: "Mood Check", 
    description: "Log your mood for the day", 
    points: 10, 
    completed: false, 
    cooldown: "once/day",
    isLocked: true,
    type: 'mood' as const
  },
  { 
    id: 4, 
    title: "Add Personal To-do", 
    description: "Add one item to your personal to-do list", 
    points: 10, 
    completed: false, 
    cooldown: "once/day",
    isLocked: true,
    type: 'todo' as const
  },
  { 
    id: 5, 
    title: "Log Today's Weather", 
    description: "What's the weather like where you are?", 
    points: 10, 
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
  const navigate = useNavigate();

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
      await UserProgressService.completeTask(user.id, taskId, task.points);
      
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
            <h2 className="text-xl font-semibold">Welcome back!</h2>
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

          {/* Right Sidebar - Milestones Only */}
          <div className="space-y-6">
            <MilestoneCard 
              milestones={mockMilestones}
              currentAmount={totalPoints}
            />
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
