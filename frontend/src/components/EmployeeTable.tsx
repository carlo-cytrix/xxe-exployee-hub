import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
  id: number;
  name: string;
  department: string;
  date: string;
}

interface EmployeeTableProps {
  records: Employee[];
}

const getDepartmentColor = (department: string) => {
  const colors: Record<string, string> = {
    Engineering:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    Marketing:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
    "Human Resources":
      "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
    Finance:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
  };
  return (
    colors[department] ||
    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800"
  );
};

const EmployeeTable = ({ records }: EmployeeTableProps) => {
  return (
    <Card className="w-full shadow-medium border-0 bg-gradient-secondary backdrop-blur-sm animate-fade-in">
      <CardHeader className="space-y-3">
        <CardTitle className="flex items-center space-x-3 text-2xl font-display">
          <div className="p-2 bg-gradient-primary rounded-xl shadow-soft">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Employee Records
          </span>
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          View all registered employees and their department information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border border-border/50 overflow-hidden shadow-soft bg-card/50 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50 border-border/50">
                <TableHead className="font-semibold text-foreground py-4 text-base">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4 text-base">
                  Department
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4 text-base">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Join Date</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length > 0 ? (
                records.map((employee, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-muted/30 transition-all duration-200 border-border/30 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell className="font-medium text-foreground py-4 text-base">
                      {employee.name}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "px-3 py-1 rounded-full font-medium border text-sm transition-all duration-200 hover:scale-105",
                          getDepartmentColor(employee.department)
                        )}
                      >
                        {employee.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground py-4 text-base">
                      {new Date(employee.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-6"
                  >
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeTable;
