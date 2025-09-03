-- Clear all user progress and completed tasks
-- This will reset everyone's scores to 0

-- Clear all completed tasks
DELETE FROM completed_tasks;

-- Reset all user progress to 0 points
UPDATE user_progress 
SET total_points = 0, 
    updated_at = NOW();

-- Verify the reset
SELECT 
  COUNT(*) as total_users,
  SUM(total_points) as total_points
FROM user_progress;
