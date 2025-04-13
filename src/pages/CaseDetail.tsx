
import Header from "@/components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { mockCrimes } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, ChevronLeft, FileText, MapPin, Shield, User, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";

const CaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const crime = mockCrimes.find(c => c.id === id);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // If crime not found, redirect to cases page
    if (!crime && id) {
      navigate("/cases");
    }
  }, [crime, id, navigate]);
  
  if (!crime) {
    return null;
  }
  
  const statusColors = {
    open: "bg-blue-100 text-blue-800",
    closed: "bg-green-100 text-green-800",
    unsolved: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800",
  };
  
  const dateObj = new Date(crime.date);
  const formattedDate = format(dateObj, "MMMM d, yyyy 'at' h:mm a");
  
  // Mock related cases - would come from database in real app
  const relatedCases = mockCrimes
    .filter(c => c.category === crime.category && c.id !== crime.id)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="bg-crime-100 text-crime-800 hover:bg-crime-200"
                >
                  {crime.category}
                </Badge>
                <Badge className={statusColors[crime.status]}>
                  {crime.status}
                </Badge>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {crime.title}
              </h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>{formattedDate}</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <MapPin className="h-4 w-4 mr-1" />
                <span>{crime.location}</span>
              </div>
              
              {crime.status === "critical" && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-red-800">Critical Case Alert</h3>
                    <p className="text-sm text-red-700">
                      This case has been marked as critical and requires immediate attention.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="prose max-w-none">
                <h2 className="text-lg font-semibold mb-2">Case Description</h2>
                <p className="text-gray-700 mb-4 whitespace-pre-line">
                  {crime.description}
                </p>
                
                <p className="text-gray-700 mb-4">
                  Local authorities are actively investigating this incident. If you have any information about this case, please contact the Crime Watch Network immediately.
                </p>
                
                {/* Additional details - would come from database in real app */}
                <h2 className="text-lg font-semibold mb-2 mt-6">Investigation Details</h2>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                  <li>Case opened on {format(dateObj, "MMMM d, yyyy")}</li>
                  <li>Responding officers filed initial report</li>
                  <li>Evidence collection in progress</li>
                  {crime.status === "closed" && <li>Case resolved on {format(new Date(), "MMMM d, yyyy")}</li>}
                </ul>
                
                <h2 className="text-lg font-semibold mb-2 mt-6">Public Safety Advice</h2>
                <p className="text-gray-700 mb-4">
                  {crime.category === "Theft" && "Residents are advised to secure their belongings and lock doors and windows when leaving home."}
                  {crime.category === "Assault" && "Residents are advised to avoid the area during late hours and travel in groups when possible."}
                  {crime.category === "Vandalism" && "Residents are advised to report any suspicious activity in the area immediately."}
                  {crime.category === "Fraud" && "Residents are advised to be vigilant about sharing personal information and to monitor their financial accounts."}
                  {crime.category === "Burglary" && "Residents are advised to ensure proper lighting around homes and consider security systems."}
                  {!["Theft", "Assault", "Vandalism", "Fraud", "Burglary"].includes(crime.category) && "Residents are advised to remain vigilant and report any suspicious activity to local authorities."}
                </p>
              </div>
            </div>
            
            {relatedCases.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Related Cases</h2>
                <div className="space-y-4">
                  {relatedCases.map(relatedCrime => (
                    <div key={relatedCrime.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-left font-medium hover:no-underline"
                            onClick={() => navigate(`/cases/${relatedCrime.id}`)}
                          >
                            {relatedCrime.title}
                          </Button>
                        </h3>
                        <Badge className={statusColors[relatedCrime.status]}>
                          {relatedCrime.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        <span>{format(new Date(relatedCrime.date), "MMM d, yyyy")}</span>
                        <Separator orientation="vertical" className="mx-2 h-3" />
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{relatedCrime.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Report Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Case ID</p>
                      <p className="text-sm text-gray-600">{crime.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Status</p>
                      <p className="text-sm text-gray-600 capitalize">{crime.status}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Reported By</p>
                      <p className="text-sm text-gray-600">Anonymous</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CalendarDays className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Date Reported</p>
                      <p className="text-sm text-gray-600">{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Location</p>
                      <p className="text-sm text-gray-600">{crime.location}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col space-y-3">
                  <Button>
                    Contact Authorities
                  </Button>
                  <Button variant="outline">
                    Share Case Information
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Have Information?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any information about this case, please report it to help with the investigation.
                </p>
                <Button className="w-full">Submit a Tip</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6 border-t mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Crime Watch Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CaseDetail;
