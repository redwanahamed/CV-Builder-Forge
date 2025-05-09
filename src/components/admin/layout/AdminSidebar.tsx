
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut
} from "lucide-react";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMediaQuery } from "@/hooks/use-mobile";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) {
      // Auto-close sidebar on mobile when selecting a tab
      const sidebarContext = document.querySelector("[data-state]");
      if (sidebarContext && sidebarContext.getAttribute("data-state") === "expanded") {
        const trigger = document.querySelector("[data-sidebar='trigger']") as HTMLButtonElement | null;
        if (trigger) trigger.click();
      }
    }
  };
  
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={activeTab === "dashboard"}
              onClick={() => handleTabChange("dashboard")}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={activeTab === "templates"}
              onClick={() => handleTabChange("templates")}
            >
              <FileText />
              <span>Templates</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={activeTab === "users"}
              onClick={() => handleTabChange("users")}
            >
              <Users />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={activeTab === "feedback"}
              onClick={() => handleTabChange("feedback")}
            >
              <MessageSquare />
              <span>Feedback</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={activeTab === "settings"}
              onClick={() => handleTabChange("settings")}
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
