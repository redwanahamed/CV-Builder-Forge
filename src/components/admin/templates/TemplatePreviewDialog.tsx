
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { TemplatePreviewDialogProps } from "./types";

export const TemplatePreviewDialog = ({ template }: TemplatePreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Template Preview: {template.name}</DialogTitle>
        </DialogHeader>
        <div className="p-4 border rounded-md bg-background">
          <img
            src={template.previewUrl}
            alt={template.name}
            className="w-full object-contain max-h-[60vh]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
