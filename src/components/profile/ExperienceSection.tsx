
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus } from 'lucide-react';
import { WorkExperience } from "@/types/jobs";

interface ExperienceSectionProps {
  experience: WorkExperience[];
  isEditing: boolean;
  onExperienceChange: (experience: WorkExperience[]) => void;
}

export default function ExperienceSection({ experience, isEditing, onExperienceChange }: ExperienceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Your professional history</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{exp.title}</h4>
                <p className="text-primary">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.location}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                {exp.current ? ' Present' : ` ${new Date(exp.endDate!).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
              </p>
            </div>
            <p className="text-sm">{exp.description}</p>
            {isEditing && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onExperienceChange(experience.filter(e => e.id !== exp.id))}
                >
                  Delete
                </Button>
              </div>
            )}
            <Separator className="my-4" />
          </div>
        ))}
        
        {isEditing && (
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Work Experience
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
