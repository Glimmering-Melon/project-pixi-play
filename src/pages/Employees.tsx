import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const Employees = () => {
  const employees = [
    { id: 1, name: "Sarah Johnson", role: "Senior Developer", lastScore: 4.5, trend: "up", assessments: 12 },
    { id: 2, name: "Michael Chen", role: "Product Manager", lastScore: 4.0, trend: "stable", assessments: 10 },
    { id: 3, name: "Emma Davis", role: "UX Designer", lastScore: 4.8, trend: "up", assessments: 11 },
    { id: 4, name: "James Wilson", role: "Backend Developer", lastScore: 3.8, trend: "down", assessments: 9 },
    { id: 5, name: "Lisa Anderson", role: "QA Engineer", lastScore: 4.3, trend: "up", assessments: 13 },
    { id: 6, name: "David Martinez", role: "Frontend Developer", lastScore: 4.1, trend: "stable", assessments: 8 },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-accent" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
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
              <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
              <p className="text-sm text-muted-foreground">View and manage your team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {employees.map((employee) => (
            <Link key={employee.id} to={`/employee/${employee.id}`}>
              <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <CardDescription>{employee.role}</CardDescription>
                    </div>
                    {getTrendIcon(employee.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Latest Score</span>
                      <span className="text-xl font-bold text-primary">{employee.lastScore}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Assessments</span>
                      <span className="text-sm font-medium">{employee.assessments}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Employees;
