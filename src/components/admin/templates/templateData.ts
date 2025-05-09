
// Mock data for templates
export const templates = [
  {
    id: 1,
    name: "Modern Resume",
    description: "Clean, minimalist design with a modern layout",
    previewUrl: "/placeholder.svg",
    createdAt: "2024-03-15",
    updatedAt: "2024-04-12"
  },
  {
    id: 2,
    name: "Professional CV",
    description: "Traditional format ideal for corporate positions",
    previewUrl: "/placeholder.svg",
    createdAt: "2024-02-20",
    updatedAt: "2024-04-05"
  },
  {
    id: 3,
    name: "Creative Portfolio",
    description: "Bold design for creative industries with visual emphasis",
    previewUrl: "/placeholder.svg",
    createdAt: "2024-01-10",
    updatedAt: "2024-03-28"
  },
  {
    id: 4,
    name: "Technical Resume",
    description: "Focused on technical skills and achievements",
    previewUrl: "/placeholder.svg",
    createdAt: "2024-03-05",
    updatedAt: "2024-04-01"
  }
];

// In a real app, this would be stored in a database
let templatesData = [...templates];

// Template management functions
export const getAllTemplates = () => {
  return [...templatesData];
};

export const deleteTemplate = (id: number) => {
  templatesData = templatesData.filter(template => template.id !== id);
  return true;
};

export const addTemplate = (template: Omit<typeof templates[0], "id" | "createdAt" | "updatedAt">) => {
  const newTemplate = {
    ...template,
    id: Math.max(0, ...templatesData.map(t => t.id)) + 1,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  
  templatesData.push(newTemplate);
  return newTemplate;
};

export const updateTemplate = (id: number, updates: Partial<Omit<typeof templates[0], "id" | "createdAt">>) => {
  const index = templatesData.findIndex(template => template.id === id);
  
  if (index !== -1) {
    templatesData[index] = {
      ...templatesData[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    return templatesData[index];
  }
  
  return null;
};
