import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, Award, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Reports = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    averageScore: 0,
    totalAssessments: 0,
    assessmentsThisMonth: 0
  });

  const [scoreDistribution, setScoreDistribution] = useState([
    { name: "5.0", value: 0, color: "hsl(var(--primary))" },
    { name: "4.0-4.9", value: 0, color: "hsl(var(--accent))" },
    { name: "3.0-3.9", value: 0, color: "hsl(var(--secondary))" },
    { name: "<3.0", value: 0, color: "hsl(var(--destructive))" },
  ]);

  const [monthlyTrend, setMonthlyTrend] = useState([
    { month: "Jan", score: 3.8, assessments: 12 },
    { month: "Feb", score: 4.0, assessments: 15 },
    { month: "Mar", score: 4.2, assessments: 18 },
    { month: "Apr", score: 4.1, assessments: 14 },
    { month: "May", score: 4.3, assessments: 16 },
    { month: "Jun", score: 4.5, assessments: 20 },
  ]);

  const [departmentScores, setDepartmentScores] = useState([
    { department: "Engineering", score: 4.2 },
    { department: "Design", score: 4.5 },
    { department: "Product", score: 4.0 },
    { department: "Marketing", score: 4.3 },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch employees count
      const { count: employeeCount } = await supabase
        .from('employees')
        .select('*', { count: 'exact', head: true });

      // Fetch assessments
      const { data: assessments } = await supabase
        .from('assessments')
        .select('overall_score, created_at');

      if (assessments) {
        const total = assessments.length;
        const avgScore = assessments.reduce((sum, a) => sum + (Number(a.overall_score) || 0), 0) / total || 0;
        
        // Count assessments this month
        const currentMonth = new Date().getMonth();
        const thisMonthCount = assessments.filter(a => 
          new Date(a.created_at).getMonth() === currentMonth
        ).length;

        // Calculate score distribution
        const dist = [0, 0, 0, 0];
        assessments.forEach(a => {
          const score = Number(a.overall_score) || 0;
          if (score === 5) dist[0]++;
          else if (score >= 4) dist[1]++;
          else if (score >= 3) dist[2]++;
          else dist[3]++;
        });

        setStats({
          totalEmployees: employeeCount || 0,
          averageScore: avgScore,
          totalAssessments: total,
          assessmentsThisMonth: thisMonthCount
        });

        setScoreDistribution([
          { name: "5.0", value: dist[0], color: "hsl(var(--primary))" },
          { name: "4.0-4.9", value: dist[1], color: "hsl(var(--accent))" },
          { name: "3.0-3.9", value: dist[2], color: "hsl(var(--secondary))" },
          { name: "<3.0", value: dist[3], color: "hsl(var(--destructive))" },
        ]);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Performance Reports</h1>
              <p className="text-sm text-muted-foreground">Analytics and insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalEmployees}</div>
              <p className="text-xs text-muted-foreground mt-1">Active team members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Score
              </CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.averageScore.toFixed(2)}</div>
              <p className="text-xs text-accent flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                Overall performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Assessments
              </CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalAssessments}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.assessmentsThisMonth}</div>
              <p className="text-xs text-muted-foreground mt-1">Assessments completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Trend</CardTitle>
              <CardDescription>Average scores over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
              <CardDescription>Performance rating breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={scoreDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Average scores by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assessment Activity</CardTitle>
              <CardDescription>Number of assessments per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="assessments" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
