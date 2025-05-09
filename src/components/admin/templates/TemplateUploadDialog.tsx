
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { addTemplate } from "./templateData";
import { toast } from "sonner";
import { TemplateUploadDialogProps } from "./types";

export const TemplateUploadDialog = ({ onTemplateAdded }: TemplateUploadDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const handleSubmit = () => {
    // Simple validation
    if (!name.trim()) {
      toast.error("Template name is required");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Add new template
      addTemplate({
        name,
        description,
        previewUrl: "/placeholder.svg" // Default image for now
      });
      
      toast.success("Template uploaded successfully");
      
      // Reset form
      setName("");
      setDescription("");
      
      // Close dialog
      setOpen(false);
      
      // Notify parent about the new template
      if (onTemplateAdded) {
        onTemplateAdded();
      }
    } catch (error) {
      toast.error("Failed to upload template");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Upload size={16} />
          <span>Upload Template</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Upload New Template</DialogTitle>
          <DialogDescription>
            Upload a new template file or define a template using HTML and CSS.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Template Name</Label>
            <Input 
              id="name" 
              placeholder="Enter template name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter template description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="file">Template File</Label>
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag & drop your HTML/CSS template file here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Or click to browse
              </p>
              <Input id="file" type="file" className="hidden" accept=".html,.css,.zip" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
