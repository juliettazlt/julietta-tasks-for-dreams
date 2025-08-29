import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Helper {
  nickname: string;
  points: number;
  rank: number;
}

interface RecentActivity {
  nickname: string;
  task: string;
  points: number;
  timeAgo: string;
}

interface LeaderboardCardProps {
  topHelpers: Helper[];
  recentActivity: RecentActivity[];
}

export const LeaderboardCard = ({ topHelpers, recentActivity }: LeaderboardCardProps) => {
  return (
    <div className="space-y-6">
      {/* Top Helpers */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏆 Top Helpers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topHelpers.map((helper) => (
            <div key={helper.nickname} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex items-center gap-3">
                <Badge variant={helper.rank === 1 ? 'default' : 'secondary'} className="w-6 h-6 rounded-full flex items-center justify-center p-0">
                  {helper.rank}
                </Badge>
                <span className="font-medium">{helper.nickname}</span>
              </div>
              <span className="text-primary font-semibold">
                ${helper.points.toLocaleString()}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚡ Recent Helpers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/30 transition-smooth">
              <div>
                <span className="font-medium">{activity.nickname}</span>
                <span className="text-muted-foreground"> completed {activity.task}</span>
              </div>
              <div className="text-right">
                <div className="text-primary font-medium">+${activity.points}</div>
                <div className="text-xs text-muted-foreground">{activity.timeAgo}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};