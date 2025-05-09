
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash } from 'lucide-react';

interface SkillsSectionProps {
  skills: string[];
  isEditing: boolean;
  onSkillsChange: (skills: string[]) => void;
}

export default function SkillsSection({ skills, isEditing, onSkillsChange }: SkillsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Highlight your professional skills</CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <Badge variant="secondary" className="mr-1">{skill}</Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => onSkillsChange(skills.filter((_, i) => i !== index))}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Add a new skill" 
                id="newSkill" 
              />
              <Button 
                variant="outline" 
                onClick={() => {
                  const input = document.getElementById('newSkill') as HTMLInputElement;
                  if (input.value) {
                    onSkillsChange([...skills, input.value]);
                    input.value = '';
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary">{skill}</Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
