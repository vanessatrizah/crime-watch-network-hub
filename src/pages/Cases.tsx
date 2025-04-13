
import Header from "@/components/Header";
import { mockCrimes } from "@/data/mockData";
import { useState, useEffect } from "react";
import { CrimeCase } from "@/components/CrimeCard";
import CrimeCard from "@/components/CrimeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useLocation } from "react-router-dom";

const Cases = () => {
  const location = useLocation();
  const initialFilter = location.state?.filter || "all";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(initialFilter);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [filteredCrimes, setFilteredCrimes] = useState<CrimeCase[]>(mockCrimes);
  
  // Get unique categories
  const categories = ["all", ...Array.from(new Set(mockCrimes.map(crime => crime.category)))];
  
  useEffect(() => {
    let result = mockCrimes;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        crime => 
          crime.title.toLowerCase().includes(term) ||
          crime.description.toLowerCase().includes(term) ||
          crime.location.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(crime => crime.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(crime => crime.category === categoryFilter);
    }
    
    setFilteredCrimes(result);
  }, [searchTerm, statusFilter, categoryFilter]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crime Cases</h1>
          <p className="text-gray-600">
            Browse and search through all reported criminal cases
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search cases..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 mr-2">Status:</span>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="unsolved">Unsolved</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Category:</span>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        {filteredCrimes.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              Found {filteredCrimes.length} cases
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCrimes.map(crime => (
                <CrimeCard key={crime.id} crime={crime} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-100 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Crime Watch Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cases;
