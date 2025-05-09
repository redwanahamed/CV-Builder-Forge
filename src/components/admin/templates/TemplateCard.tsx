
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { TemplateCardProps } from "./types";
import { TemplateEditDialog } from "./TemplateEditDialog";
import { TemplatePreviewDialog } from "./TemplatePreviewDialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const TemplateCard = ({ template, onDelete, onTemplateUpdated }: TemplateCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    onDelete(template.id);
    setDeleteDialogOpen(false);
  };

  return (
    <Card key={template.id} className="overflow-hidden">
      <div className="aspect-video bg-muted/20 relative">
        <img
          src={template.previewUrl}
          alt={template.name}
          className="w-full h-full object-cover"
        />
        <TemplatePreviewDialog template={template} />
      </div>
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-muted-foreground">
            Last updated: {template.updatedAt}
          </span>
          <div className="flex gap-2">
            <TemplateEditDialog template={template} onTemplateUpdated={onTemplateUpdated} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the template "{template.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
