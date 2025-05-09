
import { Menu, LogOut, Bot } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  activeTab: string;
}

export function AdminHeader({ activeTab }: AdminHeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <SidebarTrigger>
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <h1 className="text-xl font-semibold">
          {activeTab === "dashboard" && "Dashboard Overview"}
          {activeTab === "templates" && "Template Management"}
          {activeTab === "users" && "User Management"}
          {activeTab === "feedback" && "Feedback & Reviews"}
          {activeTab === "settings" && "Settings"}
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="hidden md:flex items-center gap-1">
          <Bot className="h-3 w-3" />
          <span>AI Support Available</span>
        </Badge>
        
        <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </div>
  );
}
