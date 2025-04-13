
import { CrimeCase } from "./CrimeCard";
import CrimeCard from "./CrimeCard";

interface RecentCrimesProps {
  crimes: CrimeCase[];
  title?: string;
}

export default function RecentCrimes({ crimes, title = "Recent Cases" }: RecentCrimesProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crimes.map((crime) => (
          <CrimeCard key={crime.id} crime={crime} />
        ))}
      </div>
    </div>
  );
}
