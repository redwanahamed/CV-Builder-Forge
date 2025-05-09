
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminContent } from "@/components/admin/layout/AdminContent";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { AdminChatPanel } from "@/components/admin/chat/AdminChatPanel";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isAdminLocked } = useAuth();
  
  // Set sidebar default state based on screen size
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // State for chat panel
  const [chatPanelOpen, setChatPanelOpen] = useState(false);
  
  useEffect(() => {
    // Auto-collapse sidebar on mobile
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // If admin is locked, render a minimal view until PIN is entered
  if (isAdminLocked) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
          <p className="text-muted-foreground">Please enter your PIN to access the admin panel</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
        
        <SidebarInset>
          <AdminHeader activeTab={activeTab} />
          <div className="p-6">
            <AdminContent activeTab={activeTab} />
          </div>
          
          {/* Floating chat button */}
          <Button
            onClick={() => setChatPanelOpen(true)}
            className="fixed bottom-4 left-4 h-12 w-12 rounded-full shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </SidebarInset>
        
        {/* Chat panel */}
        <AdminChatPanel open={chatPanelOpen} onOpenChange={setChatPanelOpen} />
      </div>
    </SidebarProvider>
  );
};

export default Admin;
