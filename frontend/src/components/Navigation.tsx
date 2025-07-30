import { NavLink } from "react-router-dom";
import { Users, History, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  return (
    <nav className="bg-gradient-secondary backdrop-blur-lg border-b border-border/50 px-6 py-4 shadow-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Users className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold text-foreground font-display">Employee Hub</span>
          </div>
          
          <div className="flex space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-primary text-primary-foreground shadow-medium scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-105"
                )
              }
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink
              to="/history"
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-primary text-primary-foreground shadow-medium scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-105"
                )
              }
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </NavLink>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
            <span className="text-sm font-semibold text-primary-foreground">JD</span>
          </div>
          <span className="text-sm font-medium text-foreground">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;