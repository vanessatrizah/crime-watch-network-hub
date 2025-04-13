
import { CrimeCase } from "../components/CrimeCard";

// Helper function to generate a random date within the last 30 days
const getRandomRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  now.setDate(now.getDate() - daysAgo);
  return now.toISOString();
};

// Helper function to generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};

// Sample locations
const locations = [
  "Downtown, Main Street",
  "Riverside Park",
  "North Mall, 2nd Floor",
  "Oak Avenue, Housing Complex",
  "Central Station",
  "West End, Apartment 3B",
  "Harbor District",
  "University Campus, Building C",
  "Industrial Zone, Warehouse 7",
  "Hillside Neighborhood",
];

// Sample categories
const categories = [
  "Theft",
  "Assault",
  "Vandalism",
  "Fraud",
  "Burglary",
  "Drug-related",
  "Public Disturbance",
  "Cyber Crime",
  "Vehicle Theft",
  "Property Damage",
];

// Sample statuses
const statuses: Array<CrimeCase["status"]> = [
  "open",
  "closed",
  "unsolved",
  "critical",
];

// Generate mock crime data
export const generateMockCrimes = (count: number): CrimeCase[] => {
  const crimes: CrimeCase[] = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    crimes.push({
      id: generateId(),
      title: `${category} Incident in ${
        locations[Math.floor(Math.random() * locations.length)]
      }`,
      description: `A ${category.toLowerCase()} incident was reported. ${
        Math.random() > 0.5
          ? "Witnesses reported suspicious activity in the area. "
          : ""
      }${
        Math.random() > 0.5
          ? "Local authorities are investigating. "
          : ""
      }${
        Math.random() > 0.5
          ? "The public is advised to remain vigilant. "
          : ""
      }${
        Math.random() > 0.5
          ? "Anyone with information is encouraged to contact the authorities. "
          : ""
      }`,
      date: getRandomRecentDate(),
      location: locations[Math.floor(Math.random() * locations.length)],
      status,
      category,
    });
  }

  // Sort by date (newest first)
  return crimes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate some mock crimes
export const mockCrimes = generateMockCrimes(30);

// Statistics
export const crimeStats = {
  totalCases: mockCrimes.length,
  openCases: mockCrimes.filter((c) => c.status === "open").length,
  solvedCases: mockCrimes.filter((c) => c.status === "closed").length,
  criticalCases: mockCrimes.filter((c) => c.status === "critical").length,
  categoryCounts: (() => {
    const counts: Record<string, number> = {};
    mockCrimes.forEach((crime) => {
      counts[crime.category] = (counts[crime.category] || 0) + 1;
    });
    return counts;
  })(),
  monthlyCounts: (() => {
    // Generate random monthly data for the last 6 months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const data = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      data.push({
        name: months[monthIndex],
        value: Math.floor(Math.random() * 50) + 20,
      });
    }

    return data;
  })(),
};
