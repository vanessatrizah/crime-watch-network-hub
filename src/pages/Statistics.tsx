
import Header from "@/components/Header";
import { mockCrimes, crimeStats } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  BarChartHorizontal,
  Calendar,
  PieChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const Statistics = () => {
  // Calculate some statistics
  const casesByStatus = {
    open: mockCrimes.filter((c) => c.status === "open").length,
    closed: mockCrimes.filter((c) => c.status === "closed").length,
    unsolved: mockCrimes.filter((c) => c.status === "unsolved").length,
    critical: mockCrimes.filter((c) => c.status === "critical").length,
  };

  const percentSolved =
    mockCrimes.length > 0
      ? Math.round((casesByStatus.closed / mockCrimes.length) * 100)
      : 0;

  const getTopCategories = () => {
    const categoryCounts: Record<string, number> = {};
    mockCrimes.forEach((crime) => {
      categoryCounts[crime.category] = (categoryCounts[crime.category] || 0) + 1;
    });
    
    return Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const topCategories = getTopCategories();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crime Statistics
          </h1>
          <p className="text-gray-600">
            Analyze crime trends and patterns over time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCrimes.length}</div>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-xs text-muted-foreground">
                  Last 30 days
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Solve Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{percentSolved}%</div>
              <div className="flex items-center mt-1">
                {percentSolved > 50 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={`text-xs ${
                    percentSolved > 50 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {percentSolved > 50 ? "Good" : "Needs improvement"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Most Common
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {topCategories.length > 0 ? topCategories[0][0] : "N/A"}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">
                  {topCategories.length > 0
                    ? `${topCategories[0][1]} cases reported`
                    : "No data available"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Critical Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{casesByStatus.critical}</div>
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs ${
                    casesByStatus.critical > 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {casesByStatus.critical > 0
                    ? "Requires immediate attention"
                    : "All clear"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cases by Status</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="relative h-60 w-60">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">{mockCrimes.length}</span>
                    <span className="text-xs ml-1">cases</span>
                  </div>
                  {/* This would be a real chart in production */}
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeDasharray={`${(casesByStatus.open / mockCrimes.length) * 339} 339`}
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="12"
                      strokeDasharray={`${(casesByStatus.closed / mockCrimes.length) * 339} 339`}
                      strokeDashoffset={-((casesByStatus.open / mockCrimes.length) * 339)}
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="12"
                      strokeDasharray={`${(casesByStatus.unsolved / mockCrimes.length) * 339} 339`}
                      strokeDashoffset={-((casesByStatus.open + casesByStatus.closed) / mockCrimes.length) * 339}
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="12"
                      strokeDasharray={`${(casesByStatus.critical / mockCrimes.length) * 339} 339`}
                      strokeDashoffset={-((casesByStatus.open + casesByStatus.closed + casesByStatus.unsolved) / mockCrimes.length) * 339}
                    />
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Open</p>
                    <p className="text-xs text-muted-foreground">{casesByStatus.open} cases</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Closed</p>
                    <p className="text-xs text-muted-foreground">{casesByStatus.closed} cases</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Unsolved</p>
                    <p className="text-xs text-muted-foreground">{casesByStatus.unsolved} cases</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Critical</p>
                    <p className="text-xs text-muted-foreground">{casesByStatus.critical} cases</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cases by Category</CardTitle>
                <BarChartHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCategories.map(([category, count], index) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm text-muted-foreground">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          index === 0
                            ? "bg-blue-500"
                            : index === 1
                            ? "bg-indigo-500"
                            : index === 2
                            ? "bg-purple-500"
                            : index === 3
                            ? "bg-pink-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${
                            (count / (topCategories[0][1] || 1)) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Monthly Trend</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <div className="flex items-end justify-between h-[250px]">
                {crimeStats.monthlyCounts.map((month, index) => (
                  <div
                    key={index}
                    className="w-1/6 flex flex-col items-center"
                  >
                    <div className="relative w-full flex justify-center">
                      <div
                        className="w-14 bg-blue-500 rounded-t-sm"
                        style={{
                          height: `${(month.value / 70) * 230}px`,
                        }}
                      ></div>
                      <div className="absolute -top-6 text-xs font-medium">
                        {month.value}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-center">{month.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Crime Watch Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Statistics;
