
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Edit, Save } from "lucide-react";
import { TemplateEditDialogTabs } from "./TemplateEditDialogTabs";
import { TemplateEditDialogProps } from "./types";
import { updateTemplate } from "./templateData";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const TemplateEditDialog = ({ template, onTemplateUpdated }: TemplateEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(template.name);
  const [description, setDescription] = useState(template.description);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setName(template.name);
      setDescription(template.description);
      setHasChanges(false);
    }
  }, [open, template]);
  
  // Track changes
  useEffect(() => {
    const hasNameChanged = name !== template.name;
    const hasDescChanged = description !== template.description;
    setHasChanges(hasNameChanged || hasDescChanged);
  }, [name, description, template]);
  
  const handleSave = async () => {
    // Simple validation
    if (!name.trim()) {
      toast.error("Template name cannot be empty");
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Update template
      const updated = updateTemplate(template.id, {
        name,
        description
      });
      
      if (updated) {
        setShowSaveAlert(true);
        
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowSaveAlert(false);
          setOpen(false);
          if (onTemplateUpdated) {
            onTemplateUpdated();
          }
        }, 3000);
      } else {
        toast.error("Failed to update template");
        setIsSaving(false);
      }
    } catch (error) {
      toast.error("An error occurred while saving");
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (hasChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Edit Template">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Template</DialogTitle>
          <DialogDescription>
            Customize the template layout and elements
          </DialogDescription>
        </DialogHeader>
        
        {showSaveAlert && (
          <Alert variant="success" autoDismiss dismissTimeout={3000}>
            <AlertDescription>
              Template saved successfully! This dialog will close automatically.
            </AlertDescription>
          </Alert>
        )}
        
        <TemplateEditDialogTabs 
          template={template} 
          nameValue={name}
          descriptionValue={description}
          onNameChange={setName}
          onDescriptionChange={setDescription}
        />

        <DialogFooter className="gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSave} 
            disabled={isSaving || !hasChanges} 
            className="flex gap-1 items-center"
          >
            {isSaving ? "Saving..." : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
