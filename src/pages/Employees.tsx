import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { AddEmployeeDialog } from "@/components/AddEmployeeDialog";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Employees = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch assessment counts and scores for each employee
      const employeesWithStats = await Promise.all(
        (data || []).map(async (emp) => {
          const { data: assessments } = await supabase
            .from('assessments')
            .select('overall_score')
            .eq('employee_id', emp.id)
            .order('created_at', { ascending: false });

          const lastScore = assessments && assessments.length > 0 
            ? Number(assessments[0].overall_score) 
            : 0;
          
          const prevScore = assessments && assessments.length > 1
            ? Number(assessments[1].overall_score)
            : lastScore;

          let trend = "stable";
          if (lastScore > prevScore) trend = "up";
          else if (lastScore < prevScore) trend = "down";

          return {
            ...emp,
            lastScore,
            trend,
            assessments: assessments?.length || 0
          };
        })
      );

      setEmployees(employeesWithStats);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
              <p className="text-sm text-muted-foreground">View and manage your team</p>
            </div>
            <AddEmployeeDialog onEmployeeAdded={fetchEmployees} />
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No employees found</p>
            </div>
          ) : (
            filteredEmployees.map((employee) => (
              <Link key={employee.id} to={`/employee/${employee.id}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{employee.full_name}</CardTitle>
                        <CardDescription>{employee.role}</CardDescription>
                      </div>
                      {getTrendIcon(employee.trend)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Latest Score</span>
                        <span className="text-xl font-bold text-primary">
                          {employee.lastScore > 0 ? employee.lastScore.toFixed(1) : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Assessments</span>
                        <span className="text-sm font-medium">{employee.assessments}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
