import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, User, Mail, Building } from "lucide-react";
import { toast } from "sonner";

interface ParsedEmployee {
  name: string;
  email: string;
  department: string;
}

const API_BASE = "";

const XmlUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedEmployee | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setParsedData(null);
    }
  };

  const parseXml = async () => {
    if (!file) {
      toast.error("Please select an XML file first");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setParsedData(data);
        toast.success("Employee profile parsed successfully!");
      } else {
        toast.error(data.error || "Parsing failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-medium border-0 bg-gradient-secondary backdrop-blur-sm animate-fade-in">
      <CardHeader className="space-y-3">
        <CardTitle className="flex items-center space-x-3 text-2xl font-display">
          <div className="p-2 bg-gradient-primary rounded-xl shadow-soft">
            <Upload className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Upload Employee Profile
          </span>
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Select an XML file containing employee information to parse and
          display the profile data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <Label
            htmlFor="xml-file"
            className="text-sm font-medium text-foreground"
          >
            XML File
          </Label>
          <div className="relative">
            <Input
              id="xml-file"
              type="file"
              accept=".xml"
              onChange={handleFileChange}
              className="cursor-pointer border-2 border-dashed border-border hover:border-primary/50 transition-all duration-200 bg-accent/30 hover:bg-accent/50 file:bg-gradient-primary file:text-primary-foreground file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium"
            />
          </div>
        </div>

        <Button
          onClick={parseXml}
          disabled={!file || isLoading}
          className="w-full bg-gradient-primary hover:shadow-strong transition-all duration-300 hover:scale-[1.02] text-base font-semibold py-6 rounded-xl"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              <span>Parsing...</span>
            </div>
          ) : (
            "Parse Employee Data"
          )}
        </Button>

        {parsedData && (
          <div className="mt-8 p-6 bg-gradient-accent rounded-2xl border border-border/50 shadow-soft animate-scale-in">
            <h3 className="text-xl font-semibold mb-6 text-foreground font-display flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Parsed Employee Information</span>
            </h3>
            <div className="grid gap-6">
              <div className="flex items-center space-x-4 p-4 bg-card/50 rounded-xl border border-border/30">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    {parsedData.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-card/50 rounded-xl border border-border/30">
                <div className="p-2 bg-info/10 rounded-lg">
                  <Mail className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    {parsedData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-card/50 rounded-xl border border-border/30">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Building className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Department
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    {parsedData.department}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default XmlUploadForm;
