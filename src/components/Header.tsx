
import { Bell, Menu, Search, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-crime-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-500" />
            <Link to="/" className="text-xl font-bold">
              Crime Watch Network
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-400">
              Dashboard
            </Link>
            <Link to="/cases" className="hover:text-blue-400">
              Cases
            </Link>
            <Link to="/map" className="hover:text-blue-400">
              Crime Map
            </Link>
            <Link to="/statistics" className="hover:text-blue-400">
              Statistics
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-8 bg-crime-800 border-crime-700 text-white w-64"
                placeholder="Search cases..."
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-crime-800">
            <div className="relative mb-4">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-8 bg-crime-800 border-crime-700 text-white w-full"
                placeholder="Search cases..."
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="px-2 py-1 hover:bg-crime-800 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/cases"
                className="px-2 py-1 hover:bg-crime-800 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cases
              </Link>
              <Link
                to="/map"
                className="px-2 py-1 hover:bg-crime-800 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Crime Map
              </Link>
              <Link
                to="/statistics"
                className="px-2 py-1 hover:bg-crime-800 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Statistics
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
