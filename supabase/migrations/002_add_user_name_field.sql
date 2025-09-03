-- Add name field to user_progress table
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS name VARCHAR(100);

-- Update the increment_points function to handle name
CREATE OR REPLACE FUNCTION increment_points(user_id UUID, points INTEGER, user_name VARCHAR DEFAULT NULL)
RETURNS INTEGER AS $$
BEGIN
  -- If this is the first time completing a task, set the name
  IF user_name IS NOT NULL THEN
    UPDATE user_progress 
    SET total_points = total_points + points,
        updated_at = NOW(),
        name = COALESCE(user_name, name)
    WHERE user_progress.user_id = increment_points.user_id;
  ELSE
    UPDATE user_progress 
    SET total_points = total_points + points,
        updated_at = NOW()
    WHERE user_progress.user_id = increment_points.user_id;
  END IF;
  
  RETURN (SELECT total_points FROM user_progress WHERE user_progress.user_id = increment_points.user_id);
END;
$$ LANGUAGE plpgsql;
