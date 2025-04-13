
import { useState } from "react";
import { MapPin } from "lucide-react";
import { CrimeCase } from "./CrimeCard";

interface CrimeMapProps {
  crimes: CrimeCase[];
}

export default function CrimeMap({ crimes }: CrimeMapProps) {
  const [selectedCrime, setSelectedCrime] = useState<CrimeCase | null>(null);

  // In a real application, you would use longitude and latitude
  // This is a simplified example with random positioning
  const getCrimePosition = (crime: CrimeCase) => {
    // Using the crime ID to create a deterministic but random-looking position
    const hash = crime.id.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return {
      left: `${Math.abs(hash % 80) + 10}%`,
      top: `${Math.abs((hash >> 8) % 80) + 10}%`,
    };
  };

  return (
    <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      {/* This would be replaced with an actual map component like Google Maps or Mapbox */}
      <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
        <span className="text-gray-500">
          Interactive map would be implemented here with actual location data
        </span>
      </div>

      {/* Crime markers */}
      {crimes.map((crime) => {
        const position = getCrimePosition(crime);
        return (
          <div
            key={crime.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: position.left, top: position.top }}
            onClick={() => setSelectedCrime(crime)}
          >
            <MapPin
              className={`h-6 w-6 ${
                crime.status === "critical"
                  ? "text-red-500"
                  : crime.status === "unsolved"
                  ? "text-yellow-500"
                  : crime.status === "open"
                  ? "text-blue-500"
                  : "text-green-500"
              }`}
            />
          </div>
        );
      })}

      {/* Crime popup */}
      {selectedCrime && (
        <div
          className="absolute bg-white p-3 rounded-lg shadow-lg z-20 w-64"
          style={{
            left: getCrimePosition(selectedCrime).left,
            top: `calc(${getCrimePosition(selectedCrime).top} - 40px)`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="flex justify-between items-start">
            <h4 className="font-semibold">{selectedCrime.title}</h4>
            <button
              onClick={() => setSelectedCrime(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {selectedCrime.description.substring(0, 100)}
            {selectedCrime.description.length > 100 ? "..." : ""}
          </p>
          <div className="text-xs text-gray-500 mt-2">
            {selectedCrime.location}
          </div>
        </div>
      )}
    </div>
  );
}
