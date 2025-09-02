-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create completed_tasks table
CREATE TABLE IF NOT EXISTS completed_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  task_id INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  points_earned INTEGER NOT NULL,
  UNIQUE(user_id, task_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_tasks_user_id ON completed_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_tasks_task_id ON completed_tasks(task_id);

-- Create function to increment points
CREATE OR REPLACE FUNCTION increment_points(user_id UUID, points INTEGER)
RETURNS INTEGER AS $$
BEGIN
  UPDATE user_progress 
  SET total_points = total_points + points,
      updated_at = NOW()
  WHERE user_progress.user_id = increment_points.user_id;
  
  RETURN (SELECT total_points FROM user_progress WHERE user_progress.user_id = increment_points.user_id);
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for user_progress
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for completed_tasks
CREATE POLICY "Users can view their own completed tasks" ON completed_tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own completed tasks" ON completed_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow reading total points for all users (for the goal display)
CREATE POLICY "Anyone can read total points" ON user_progress
  FOR SELECT USING (true);
