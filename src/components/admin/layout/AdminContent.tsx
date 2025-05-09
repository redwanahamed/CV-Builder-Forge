
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { TemplateManagement } from "@/components/admin/TemplateManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { FeedbackManagement } from "@/components/admin/FeedbackManagement";
import { AdminSettings } from "@/components/admin/AdminSettings";

interface AdminContentProps {
  activeTab: string;
}

export function AdminContent({ activeTab }: AdminContentProps) {
  // Render the appropriate content based on activeTab
  switch(activeTab) {
    case "dashboard":
      return <AdminDashboard />;
    case "templates":
      return <TemplateManagement />;
    case "users":
      return <UserManagement />;
    case "feedback":
      return <FeedbackManagement />;
    case "settings":
      return <AdminSettings />;
    default:
      return <AdminDashboard />;
  }
}
