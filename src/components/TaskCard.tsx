import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle, Play, Clock, Lock, Camera, Smile, ListTodo, Cloud } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  cooldown: string;
  isGatekeeper?: boolean;
  isLocked?: boolean;
  type?: 'run' | 'selfie' | 'mood' | 'todo' | 'weather';
}

interface TaskCardProps {
  task: Task;
  onTaskComplete?: (taskId: number) => void;
}

type MoodType = 'sad' | 'average' | 'happy';
type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy';

export const TaskCard = ({ task, onTaskComplete }: TaskCardProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSelfieInstructions, setShowSelfieInstructions] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showWeatherSelector, setShowWeatherSelector] = useState(false);
  const [showTodoInstructions, setShowTodoInstructions] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<WeatherType | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    if (task.type === 'weather') {
      setShowWeatherSelector(true);
    } else if (task.type === 'todo') {
      setShowTodoInstructions(true);
    } else if (task.type === 'mood') {
      setShowMoodSelector(true);
    } else if (task.type === 'selfie') {
      setShowSelfieInstructions(true);
    } else if (task.isGatekeeper) {
      setShowConfirmation(true);
    } else {
      completeTask();
    }
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleWeatherSelect = (weather: WeatherType) => {
    setSelectedWeather(weather);
  };

  const handleMoodSubmit = () => {
    if (selectedMood) {
      setShowMoodSelector(false);
      completeTask(selectedMood);
    }
  };

  const handleWeatherSubmit = () => {
    if (selectedWeather) {
      setShowWeatherSelector(false);
      completeTask(selectedWeather);
    }
  };

  const handleTodoInstructions = () => {
    setShowTodoInstructions(false);
    completeTask();
  };

  const handleTakeSelfie = () => {
    const phoneNumber = '+1 2065365319';
    const message = encodeURIComponent("Hey Julietta! Just finished my workout and wanted to share this selfie with you! 💪✨");
    const smsUrl = `sms:${phoneNumber}?body=${message}`;
    
    // Try to open SMS app
    window.open(smsUrl, '_blank');
    
    // Show confirmation toast
    toast.success("📱 Message app opened!", {
      description: "Send your post-workout selfie to Julietta!",
      duration: 3000,
    });
    
    // Close the instruction modal
    setShowSelfieInstructions(false);
    
    // Mark task as completed after a short delay
    setTimeout(() => {
      completeTask();
    }, 1000);
  };

  const completeTask = async (mood?: MoodType, weather?: WeatherType) => {
    setIsCompleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success toast
    let taskName = 'Task Completed!';
    if (task.type === 'selfie') {
      taskName = 'Selfie Sent!';
    } else if (task.type === 'mood') {
      taskName = 'Mood Logged!';
    } else if (task.type === 'weather') {
      taskName = 'Weather Logged!';
    } else if (task.type === 'todo') {
      taskName = 'To-do Added!';
    } else if (task.isGatekeeper) {
      taskName = 'Run Completed!';
    }
    
    toast.success(`🎉 ${taskName}`, {
      description: `+$${task.points} donated to Julietta's birthday dreams!`,
      duration: 3000,
    });

    // Call parent callback to unlock other tasks
    if (onTaskComplete) {
      onTaskComplete(task.id);
    }

    setIsCompleting(false);
    setShowConfirmation(false);
    setSelectedMood(null);
    setSelectedWeather(null);
  };

  // If task is locked, show blurred version
  if (task.isLocked) {
    return (
      <Card className="opacity-50 blur-sm pointer-events-none transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              {task.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {task.cooldown}
              </Badge>
              <Badge variant="default">
                +${task.points}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{task.description}</p>
          <div className="text-center text-muted-foreground">
            🔒 Complete the Run task to unlock
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={`transition-all duration-200 ${task.completed ? 'opacity-75' : 'hover:shadow-md'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : task.type === 'selfie' ? (
                <Camera className="h-5 w-5 text-purple-500" />
              ) : task.type === 'mood' ? (
                <Smile className="h-5 w-5 text-yellow-500" />
              ) : task.type === 'weather' ? (
                <Cloud className="h-5 w-5 text-cyan-500" />
              ) : task.type === 'todo' ? (
                <ListTodo className="h-5 w-5 text-blue-500" />
              ) : (
                <Play className="h-5 w-5 text-blue-500" />
              )}
              {task.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {task.cooldown}
              </Badge>
              <Badge variant="default">
                +${task.points}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{task.description}</p>
          {!task.completed && (
            <Button 
              onClick={handleComplete}
              className="w-full"
              variant="default"
              disabled={isCompleting}
            >
              {isCompleting ? "Completing..." : "Complete Task"}
            </Button>
          )}
          {task.completed && (
            <div className="text-center text-green-600 font-medium">
              ✓ Completed today
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Run Task */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              🏃‍♂️ Daily Run Check
            </DialogTitle>
            <DialogDescription className="text-left">
              <p className="mb-4">
                Have you completed your run today? I hope you enjoyed your little jog and got those endorphins flowing! 
              </p>
              <p className="text-sm text-muted-foreground">
                Remember, any form of movement counts - whether it's a quick jog around the block, a brisk walk, or even some energetic dancing! 🎵
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmation(false)}
              disabled={isCompleting}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => completeTask()}
              disabled={isCompleting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isCompleting ? "Recording..." : "I Ran! 🏃‍♂️"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Selfie Instructions Dialog */}
      <Dialog open={showSelfieInstructions} onOpenChange={setShowSelfieInstructions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              📸 Post-Workout Selfie Time!
            </DialogTitle>
            <DialogDescription className="text-left">
              <p className="mb-4">
                Great job on your workout! Now it's time to capture that post-exercise glow and share it with Julietta! ✨
              </p>
              <p className="mb-4">
                Take a fun selfie showing off your workout vibes - whether you're sweaty, smiling, or just feeling accomplished! 💪
              </p>
              <p className="text-sm text-muted-foreground">
                We'll open your message app with Julietta's number pre-filled, so you can send it right away!
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowSelfieInstructions(false)}
              disabled={isCompleting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleTakeSelfie}
              disabled={isCompleting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              📱 Take Selfie & Send!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mood Selector Dialog */}
      <Dialog open={showMoodSelector} onOpenChange={setShowMoodSelector}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              😊 How are you feeling today?
            </DialogTitle>
            <DialogDescription className="text-left">
              <p className="mb-4">
                Take a moment to check in with yourself! How's your mood right now?
              </p>
              <p className="text-sm text-muted-foreground">
                Your mood check helps Julietta know how her friends are doing! 💕
              </p>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={selectedMood === 'sad' ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  selectedMood === 'sad' ? 'bg-red-100 border-red-300' : ''
                }`}
                onClick={() => handleMoodSelect('sad')}
              >
                <span className="text-3xl">😞</span>
                <span className="text-sm">Sad</span>
              </Button>
              
              <Button
                variant={selectedMood === 'average' ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  selectedMood === 'average' ? 'bg-yellow-100 border-yellow-300' : ''
                }`}
                onClick={() => handleMoodSelect('average')}
              >
                <span className="text-3xl">😐</span>
                <span className="text-sm">Okay</span>
              </Button>
              
              <Button
                variant={selectedMood === 'happy' ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  selectedMood === 'happy' ? 'bg-green-100 border-green-300' : ''
                }`}
                onClick={() => handleMoodSelect('happy')}
              >
                <span className="text-3xl">🙂</span>
                <span className="text-sm">Happy</span>
              </Button>
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowMoodSelector(false)}
              disabled={isCompleting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleMoodSubmit}
              disabled={isCompleting || !selectedMood}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {isCompleting ? "Logging..." : "Log My Mood! 😊"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Weather Selector Dialog */}
      <Dialog open={showWeatherSelector} onOpenChange={setShowWeatherSelector}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              🌤️ What's the weather like today?
            </DialogTitle>
            <DialogDescription className="text-left">
              <p className="mb-4">
                Let Julietta know what the weather is like where you are! This helps her feel connected to friends around the world.
              </p>
              <p className="text-sm text-muted-foreground">
                Weather affects our mood and activities - share your weather vibes! 🌍
              </p>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={selectedWeather === 'sunny' ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  selectedWeather === 'sunny' ? 'bg-yellow-100 border-yellow-300' : ''
                }`}
                onClick={() => handleWeatherSelect('sunny')}
              >
                <span className="text-3xl">☀️</span>
                <span className="text-sm">Sunny</span>
              </Button>
              
              <Button
                variant={selectedWeather === 'cloudy' ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  selectedWeather === 'cloudy' ? 'bg-gray-100 border-gray-300' : ''
                }`}
                onClick={() => handleWeatherSelect('cloudy')}
              >
                <span className="text-3xl">☁️</span>
                <span className="text-sm">Cloudy</span>
              </Button>
              
              <Button
                variant={selectedWeather === 'rainy' ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  selectedWeather === 'rainy' ? 'bg-blue-100 border-blue-300' : ''
                }`}
                onClick={() => handleWeatherSelect('rainy')}
              >
                <span className="text-3xl">🌧️</span>
                <span className="text-sm">Rainy</span>
              </Button>
              
              <Button
                variant={selectedWeather === 'snowy' ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  selectedWeather === 'snowy' ? 'bg-blue-100 border-blue-300' : ''
                }`}
                onClick={() => handleWeatherSelect('snowy')}
              >
                <span className="text-3xl">❄️</span>
                <span className="text-sm">Snowy</span>
              </Button>
              
              <Button
                variant={selectedWeather === 'stormy' ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  selectedWeather === 'stormy' ? 'bg-purple-100 border-purple-300' : ''
                }`}
                onClick={() => handleWeatherSelect('stormy')}
              >
                <span className="text-3xl">⛈️</span>
                <span className="text-sm">Stormy</span>
              </Button>
              
              <Button
                variant={selectedWeather === 'foggy' ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  selectedWeather === 'foggy' ? 'bg-gray-100 border-gray-300' : ''
                }`}
                onClick={() => handleWeatherSelect('foggy')}
              >
                <span className="text-3xl">🌫️</span>
                <span className="text-sm">Foggy</span>
              </Button>
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowWeatherSelector(false)}
              disabled={isCompleting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleWeatherSubmit}
              disabled={isCompleting || !selectedWeather}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {isCompleting ? "Logging..." : "Log Weather! 🌤️"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* To-do Instructions Dialog */}
      <Dialog open={showTodoInstructions} onOpenChange={setShowTodoInstructions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              📝 Personal To-do Time!
            </DialogTitle>
            <DialogDescription className="text-left">
              <p className="mb-4">
                Great! Now let's add something to your personal to-do list. This helps you stay organized while contributing to Julietta's birthday! ✨
              </p>
              <p className="mb-4">
                Switch to the "Personal To-dos" tab above and add any task you'd like to accomplish today - whether it's calling a friend, reading a book, or organizing your space!
              </p>
              <p className="text-sm text-muted-foreground">
                Every to-do you add and complete earns points for Julietta's birthday dreams!
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowTodoInstructions(false)}
              disabled={isCompleting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleTodoInstructions}
              disabled={isCompleting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isCompleting ? "Completing..." : "Got it! 📝"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
