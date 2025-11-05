import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateAssessment = () => {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState([
    { name: "Quality of Work", score: 3 },
    { name: "Communication", score: 3 },
    { name: "Teamwork", score: 3 },
    { name: "Initiative", score: 3 },
    { name: "Time Management", score: 3 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Assessment saved successfully!");
    navigate("/");
  };

  const updateScore = (index: number, score: number) => {
    const newCriteria = [...criteria];
    newCriteria[index].score = score;
    setCriteria(newCriteria);
  };

  const averageScore = (criteria.reduce((sum, c) => sum + c.score, 0) / criteria.length).toFixed(1);

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
              <h1 className="text-2xl font-bold text-foreground">New Assessment</h1>
              <p className="text-sm text-muted-foreground">Create a performance review</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Information</CardTitle>
                <CardDescription>Select the employee and assessment period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="employee">Employee</Label>
                  <Select required>
                    <SelectTrigger id="employee">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Sarah Johnson</SelectItem>
                      <SelectItem value="2">Michael Chen</SelectItem>
                      <SelectItem value="3">Emma Davis</SelectItem>
                      <SelectItem value="4">James Wilson</SelectItem>
                      <SelectItem value="5">Lisa Anderson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="period">Assessment Period</Label>
                  <Select required>
                    <SelectTrigger id="period">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="date">Assessment Date</Label>
                  <Input type="date" id="date" required defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Criteria</CardTitle>
                <CardDescription>Rate the employee on each criterion (1-5 scale)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {criteria.map((criterion, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>{criterion.name}</Label>
                      <span className="text-sm font-medium text-primary">{criterion.score}/5</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => updateScore(index, score)}
                          className={`flex-1 py-3 rounded-md border-2 transition-all font-medium ${
                            criterion.score === score
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border hover:border-primary/50"
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Average Score</span>
                    <span className="text-2xl font-bold text-primary">{averageScore}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Comments</CardTitle>
                <CardDescription>Provide detailed feedback and notes</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your observations, achievements, and areas for improvement..."
                  className="min-h-[150px]"
                />
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 gap-2">
                <Save className="h-4 w-4" />
                Save Assessment
              </Button>
              <Link to="/" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssessment;
