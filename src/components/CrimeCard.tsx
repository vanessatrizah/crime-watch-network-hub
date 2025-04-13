
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface CrimeCase {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: "open" | "closed" | "unsolved" | "critical";
  category: string;
}

interface CrimeCardProps {
  crime: CrimeCase;
}

export default function CrimeCard({ crime }: CrimeCardProps) {
  const statusColors = {
    open: "bg-blue-100 text-blue-800",
    closed: "bg-green-100 text-green-800",
    unsolved: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800",
  };

  const dateObj = new Date(crime.date);
  const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true });

  return (
    <div className="crime-card">
      <div className="flex justify-between items-start mb-2">
        <Badge
          variant="outline"
          className="bg-crime-100 text-crime-800 hover:bg-crime-200"
        >
          {crime.category}
        </Badge>
        <Badge className={statusColors[crime.status]}>{crime.status}</Badge>
      </div>
      <Link to={`/cases/${crime.id}`}>
        <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">
          {crime.title}
        </h3>
      </Link>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {crime.description}
      </p>
      <div className="flex items-center text-sm text-gray-500 mb-1">
        <CalendarDays className="h-4 w-4 mr-1" />
        <span>{timeAgo}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{crime.location}</span>
      </div>
    </div>
  );
}
