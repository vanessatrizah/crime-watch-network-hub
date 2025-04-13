
import Header from "@/components/Header";
import { mockCrimes } from "@/data/mockData";
import CrimeMap from "@/components/CrimeMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, MapPin, Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";
import { CrimeCase } from "@/components/CrimeCard";

const CrimeMapPage = () => {
  const [filter, setFilter] = useState("all");
  const [displayedCrimes, setDisplayedCrimes] = useState(mockCrimes);
  
  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value === "all") {
      setDisplayedCrimes(mockCrimes);
    } else {
      setDisplayedCrimes(mockCrimes.filter(crime => crime.status === value));
    }
  };
  
  const categories = Array.from(new Set(mockCrimes.map(crime => crime.category)));
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crime Map</h1>
          <p className="text-gray-600">
            Visualize crime locations and hotspots in your area
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 className="font-medium mb-3">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Status</label>
                  <Select value={filter} onValueChange={handleFilterChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="unsolved">Unsolved</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Enter location" className="pl-10" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Date Range</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Select date range" className="pl-10" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 6).map(category => (
                      <Badge key={category} variant="outline" className="cursor-pointer hover:bg-gray-100">
                        {category}
                      </Badge>
                    ))}
                    {categories.length > 6 && (
                      <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                        +{categories.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium mb-3">Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm">Critical Cases</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm">Unsolved Cases</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm">Open Cases</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Closed Cases</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-medium">Interactive Crime Map</h3>
                <div className="text-sm text-gray-500">
                  Showing {displayedCrimes.length} cases
                </div>
              </div>
              <CrimeMap crimes={displayedCrimes} />
              <div className="mt-4 text-sm text-gray-500 text-center">
                Click on any marker to view case details. Zoom in for more precise locations.
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Crime Watch Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CrimeMapPage;
