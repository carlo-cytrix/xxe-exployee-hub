import Navigation from "@/components/Navigation";
import XmlUploadForm from "@/components/XmlUploadForm";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 font-display bg-gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload and manage employee profiles through XML file processing with
            our advanced parsing system.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <XmlUploadForm />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
