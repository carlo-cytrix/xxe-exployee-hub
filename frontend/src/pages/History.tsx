import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import EmployeeTable from "@/components/EmployeeTable";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "http://backend:5000");

const History = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_BASE}/history`);
        const data = await res.json();
        if (res.ok) {
          setRecords(data);
        } else {
          setError(data.error || "Failed to fetch history");
        }
      } catch (err) {
        console.error(err);
        setError("Server error");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 font-display bg-gradient-primary bg-clip-text text-transparent">
            Employee History
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Browse through all registered employee records and their
            comprehensive details.
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <EmployeeTable records={records} />
      </main>
    </div>
  );
};

export default History;
