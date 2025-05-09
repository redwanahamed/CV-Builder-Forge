
export interface Template {
  id: number;
  name: string;
  description: string;
  previewUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateCardProps {
  template: Template;
  onDelete: (id: number) => void;
  onTemplateUpdated?: () => void;
}

export interface TemplateListProps {
  templates: Template[];
  onDelete: (id: number) => void;
  onTemplateUpdated?: () => void;
}

export interface TemplateSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export interface TemplatePreviewDialogProps {
  template: Template;
}

export interface TemplateEditDialogProps {
  template: Template;
  onTemplateUpdated?: () => void;
}

export interface TemplateEditDialogTabsProps {
  template: Template;
  nameValue: string;
  descriptionValue: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export interface TemplateUploadDialogProps {
  onTemplateAdded?: () => void;
}
