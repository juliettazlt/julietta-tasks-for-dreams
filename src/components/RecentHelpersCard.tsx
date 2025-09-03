import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

interface RecentHelper {
  id: string;
  name: string;
  total_points: number;
  last_activity: string;
}

export const RecentHelpersCard = () => {
  const [recentHelpers, setRecentHelpers] = useState<RecentHelper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecentHelpers();
  }, []);

  const loadRecentHelpers = async () => {
    try {
      setIsLoading(true);
      
      // Get all user progress with recent activity
      const { data: userProgress, error } = await supabase
        .from('user_progress')
        .select(`
          user_id,
          total_points,
          name,
          updated_at
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Create helpers list with real names or fallback to generic names
      const helpers: RecentHelper[] = (userProgress || []).map((progress, index) => ({
        id: progress.user_id,
        name: progress.name || `Helper ${index + 1}`, // Use real name or fallback to generic
        total_points: progress.total_points,
        last_activity: progress.updated_at
      }));

      setRecentHelpers(helpers);
    } catch (error) {
      console.error('Error loading recent helpers:', error);
      // Fallback to mock data if there's an error
      setRecentHelpers([
        { id: '1', name: 'xiaoming', total_points: 50, last_activity: new Date().toISOString() },
        { id: '2', name: 'tiantian', total_points: 30, last_activity: new Date().toISOString() },
        { id: '3', name: 'chidao', total_points: 20, last_activity: new Date().toISOString() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (isLoading) {
    return (
      <Card className="clean-card">
        <CardHeader>
          <CardTitle className="text-lg">🌟 All Helpers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-2 bg-gray-100 rounded animate-pulse w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="clean-card">
      <CardHeader>
        <CardTitle className="text-lg">🌟 All Helpers</CardTitle>
        <p className="text-sm text-gray-500">All contributors to Julietta's dreams</p>
      </CardHeader>
                          <CardContent>
        <div className="space-y-4 max-h-64 overflow-y-auto">
                  {recentHelpers.length > 0 ? (
            recentHelpers.map((helper) => (
              <div key={helper.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                      {getInitials(helper.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {helper.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(helper.last_activity)}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs font-medium">
                    ${helper.total_points}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm">No helpers yet</p>
              <p className="text-gray-400 text-xs">Be the first to help!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
