
import { useState, useEffect } from "react";
import { TemplateSearch } from "./templates/TemplateSearch";
import { TemplateUploadDialog } from "./templates/TemplateUploadDialog";
import { TemplateList } from "./templates/TemplateList";
import { getAllTemplates, deleteTemplate } from "./templates/templateData";
import { Template } from "./templates/types";
import { toast } from "sonner";

export const TemplateManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  
  useEffect(() => {
    // Load templates when component mounts
    setTemplates(getAllTemplates());
  }, []);
  
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (deleteTemplate(id)) {
      // Update local state after deletion
      setTemplates(getAllTemplates());
      toast.success("Template deleted successfully");
    } else {
      toast.error("Failed to delete template");
    }
  };

  const handleTemplateAdded = () => {
    // Refresh templates when a new one is added
    setTemplates(getAllTemplates());
  };

  const handleTemplateUpdated = () => {
    // Refresh templates when one is updated
    setTemplates(getAllTemplates());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TemplateSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <TemplateUploadDialog onTemplateAdded={handleTemplateAdded} />
      </div>

      <TemplateList 
        templates={filteredTemplates} 
        onDelete={handleDelete}
        onTemplateUpdated={handleTemplateUpdated}
      />
    </div>
  );
};
