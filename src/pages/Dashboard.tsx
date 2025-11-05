import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { title: "Team Members", value: "12", icon: Users, trend: "+2 this month" },
    { title: "Assessments Due", value: "3", icon: Calendar, trend: "This week" },
    { title: "Average Score", value: "4.2", icon: TrendingUp, trend: "+0.3 from last quarter" },
  ];

  const recentAssessments = [
    { employee: "Sarah Johnson", date: "2025-11-03", score: 4.5, period: "Monthly" },
    { employee: "Michael Chen", date: "2025-11-02", score: 4.0, period: "Bi-weekly" },
    { employee: "Emma Davis", date: "2025-11-01", score: 4.8, period: "Monthly" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Employee Assessment System</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Manager</p>
            </div>
            <Link to="/assessment/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
              <CardDescription>Latest performance reviews submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssessments.map((assessment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{assessment.employee}</p>
                      <p className="text-sm text-muted-foreground">
                        {assessment.date} · {assessment.period}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{assessment.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/assessments">
                <Button variant="outline" className="w-full mt-4">
                  View All Assessments
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/assessment/new">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Assessment
                </Button>
              </Link>
              <Link to="/employees">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Manage Team Members
                </Button>
              </Link>
              <Link to="/reports">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <TrendingUp className="h-4 w-4" />
                  View Performance Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
