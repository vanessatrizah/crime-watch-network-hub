
import Header from "@/components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, BarChart, FileText, Map, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import { mockCrimes, crimeStats } from "@/data/mockData";
import RecentCrimes from "@/components/RecentCrimes";
import CrimeMap from "@/components/CrimeMap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const recentCrimes = mockCrimes.slice(0, 6);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crime Watch Dashboard</h1>
          <p className="text-gray-600">
            Monitor and track criminal activity in your area
          </p>
        </div>
        
        {crimeStats.criticalCases > 0 && (
          <Alert className="mb-6 border-alert-100 bg-alert-100 text-alert-700">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Cases Alert</AlertTitle>
            <AlertDescription>
              There are currently {crimeStats.criticalCases} critical cases that require immediate attention.
              <Button 
                variant="link" 
                className="p-0 h-auto text-alert-700 font-medium ml-2"
                onClick={() => navigate("/cases", { state: { filter: "critical" } })}
              >
                View critical cases
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Cases"
            value={crimeStats.totalCases}
            icon={<FileText className="h-4 w-4" />}
            description="Total reported cases in the system"
          />
          <StatCard
            title="Open Investigations"
            value={crimeStats.openCases}
            icon={<Shield className="h-4 w-4" />}
            description="Cases currently under investigation"
            trend={{ value: 12, positive: false }}
          />
          <StatCard
            title="Solved Cases"
            value={crimeStats.solvedCases}
            icon={<Shield className="h-4 w-4" />}
            description="Successfully resolved cases"
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Critical Cases"
            value={crimeStats.criticalCases}
            icon={<AlertTriangle className="h-4 w-4" />}
            description="High priority cases requiring immediate attention"
            className={crimeStats.criticalCases > 0 ? "border-red-200 bg-red-50" : ""}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Crime Map</h2>
              <Button variant="outline" onClick={() => navigate("/map")}>
                <Map className="h-4 w-4 mr-2" />
                View Full Map
              </Button>
            </div>
            <CrimeMap crimes={recentCrimes} />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Crime Statistics</h2>
              <Button variant="outline" onClick={() => navigate("/statistics")}>
                <BarChart className="h-4 w-4 mr-2" />
                View Detailed Stats
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-medium text-gray-700 mb-3">Cases by Category</h3>
                <div className="space-y-2">
                  {Object.entries(crimeStats.categoryCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{category}</span>
                        <div className="flex items-center">
                          <div className="h-2 bg-blue-500 rounded-full mr-2" style={{ width: `${Math.min(count * 5, 100)}px` }}></div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-medium text-gray-700 mb-3">Monthly Trend</h3>
                <div className="flex items-end h-40 space-x-2 mt-2">
                  {crimeStats.monthlyCounts.map((month, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(month.value / 70) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-1 text-gray-500">{month.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <RecentCrimes crimes={recentCrimes} />
        
        <div className="mt-4 text-center">
          <Button onClick={() => navigate("/cases")}>View All Cases</Button>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Crime Watch Network. All rights reserved.</p>
          <p className="text-sm mt-1">
            This platform is for public awareness and educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
