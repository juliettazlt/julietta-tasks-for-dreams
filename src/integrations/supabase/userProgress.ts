import { supabase } from './client';
import type { Database } from './types';

type UserProgress = Database['public']['Tables']['user_progress']['Row'];
type CompletedTask = Database['public']['Tables']['completed_tasks']['Row'];

export class UserProgressService {
  // Get or create user progress
  static async getUserProgress(userId: string): Promise<UserProgress> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      // User progress doesn't exist, create it
      const { data: newProgress, error: createError } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          total_points: 0
        })
        .select()
        .single();

      if (createError) throw createError;
      return newProgress;
    }

    if (error) throw error;
    return data;
  }

  // Create or update user progress with name
  static async createUserProgress(userId: string, name: string): Promise<UserProgress> {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        name: name,
        total_points: 0
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get completed tasks for a user
  static async getCompletedTasks(userId: string): Promise<CompletedTask[]> {
    const { data, error } = await supabase
      .from('completed_tasks')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  }

  // Complete a task for a user
  static async completeTask(userId: string, taskId: number, points: number, userName?: string): Promise<void> {
    // Check if task is already completed
    const { data: existingTask } = await supabase
      .from('completed_tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('task_id', taskId)
      .single();

    if (existingTask) {
      throw new Error('Task already completed');
    }

    // Insert completed task
    const { error: taskError } = await supabase
      .from('completed_tasks')
      .insert({
        user_id: userId,
        task_id: taskId,
        points_earned: points
      });

    if (taskError) throw taskError;

    // Update user progress using RPC function with name
    const { error: progressError } = await supabase
      .rpc('increment_points', { 
        user_id: userId, 
        points: points,
        user_name: userName || null
      });

    if (progressError) throw progressError;
  }

  // Get total points across all users
  static async getTotalPoints(): Promise<number> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('total_points');

    if (error) throw error;
    return data?.reduce((sum, row) => sum + row.total_points, 0) || 0;
  }
}
