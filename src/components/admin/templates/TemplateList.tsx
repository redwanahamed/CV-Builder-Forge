
import { TemplateCard } from "./TemplateCard";
import { TemplateListProps } from "./types";

export const TemplateList = ({ templates, onDelete, onTemplateUpdated }: TemplateListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.length > 0 ? (
        templates.map((template) => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            onDelete={onDelete}
            onTemplateUpdated={onTemplateUpdated}
          />
        ))
      ) : (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center h-40 border rounded-md">
          <p className="text-muted-foreground">No templates found</p>
        </div>
      )}
    </div>
  );
};
