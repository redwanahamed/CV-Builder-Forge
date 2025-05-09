
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  isPremium: boolean;
}

interface ResumeTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export default function ResumeTemplates({ selectedTemplate, onSelectTemplate }: ResumeTemplatesProps) {
  // Sample templates data
  const templates: Template[] = [
    {
      id: 'minimalist',
      name: 'Minimalist',
      thumbnail: '/placeholder.svg',
      description: 'A clean, simple design focused on content',
      isPremium: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      thumbnail: '/placeholder.svg',
      description: 'Traditional layout with a modern touch',
      isPremium: false,
    },
    {
      id: 'creative',
      name: 'Creative',
      thumbnail: '/placeholder.svg',
      description: 'Stand out with this unique design',
      isPremium: true,
    },
    {
      id: 'executive',
      name: 'Executive',
      thumbnail: '/placeholder.svg',
      description: 'Sophisticated design for senior positions',
      isPremium: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardContent className="p-0 relative">
              <img 
                src={template.thumbnail} 
                alt={template.name} 
                className="w-full aspect-[210/297] object-cover rounded-t-lg" 
              />
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{template.name}</h3>
                  {template.isPremium && (
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 text-xs px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
