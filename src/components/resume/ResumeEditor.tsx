
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ResumeEditorProps {
  resumeData: any;
  setResumeData: (data: any) => void;
}

export default function ResumeEditor({ resumeData, setResumeData }: ResumeEditorProps) {
  const { toast } = useToast();

  // Update general information
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      [name]: value
    });
  };

  // Handle experience items
  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      period: '',
      description: ''
    };

    setResumeData({
      ...resumeData,
      experience: [...(resumeData.experience || []), newExperience]
    });

    toast({
      description: "New experience section added",
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperience = [...(resumeData.experience || [])];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };

    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...(resumeData.experience || [])];
    updatedExperience.splice(index, 1);

    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });

    toast({
      description: "Experience section removed",
    });
  };

  // Handle education items
  const addEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      period: ''
    };

    setResumeData({
      ...resumeData,
      education: [...(resumeData.education || []), newEducation]
    });

    toast({
      description: "New education section added",
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...(resumeData.education || [])];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };

    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...(resumeData.education || [])];
    updatedEducation.splice(index, 1);

    setResumeData({
      ...resumeData,
      education: updatedEducation
    });

    toast({
      description: "Education section removed",
    });
  };

  // Handle skills
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    setResumeData({
      ...resumeData,
      skills: skillsArray
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Resume</h2>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium block mb-1">Full Name</label>
              <Input 
                id="name" 
                name="name" 
                placeholder="John Doe" 
                value={resumeData?.name || ''} 
                onChange={handleGeneralChange}
              />
            </div>
            
            <div>
              <label htmlFor="title" className="text-sm font-medium block mb-1">Professional Title</label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Software Engineer" 
                value={resumeData?.title || ''} 
                onChange={handleGeneralChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-1">Email</label>
                <Input 
                  id="email" 
                  name="email" 
                  placeholder="email@example.com" 
                  value={resumeData?.email || ''} 
                  onChange={handleGeneralChange}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="text-sm font-medium block mb-1">Phone</label>
                <Input 
                  id="phone" 
                  name="phone" 
                  placeholder="(123) 456-7890" 
                  value={resumeData?.phone || ''} 
                  onChange={handleGeneralChange}
                />
              </div>
              
              <div>
                <label htmlFor="location" className="text-sm font-medium block mb-1">Location</label>
                <Input 
                  id="location" 
                  name="location" 
                  placeholder="City, Country" 
                  value={resumeData?.location || ''} 
                  onChange={handleGeneralChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="summary" className="text-sm font-medium block mb-1">Summary</label>
              <Textarea 
                id="summary" 
                name="summary" 
                placeholder="A brief summary of your qualifications and career goals..." 
                value={resumeData?.summary || ''} 
                onChange={handleGeneralChange}
                rows={4}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-4">
          <div className="space-y-4">
            <Button onClick={addExperience} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
            
            {resumeData?.experience?.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {resumeData.experience.map((exp: any, index: number) => (
                  <AccordionItem key={index} value={`exp-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left">
                        {exp.company || exp.position ? 
                          `${exp.company || 'Company'} - ${exp.position || 'Position'}` : 
                          `Experience ${index + 1}`}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium block mb-1">Company</label>
                            <Input 
                              value={exp.company || ''} 
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              placeholder="Company name"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium block mb-1">Position</label>
                            <Input 
                              value={exp.position || ''} 
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              placeholder="Job title"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium block mb-1">Period</label>
                          <Input 
                            value={exp.period || ''} 
                            onChange={(e) => updateExperience(index, 'period', e.target.value)}
                            placeholder="e.g. Jan 2020 - Present"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium block mb-1">Description</label>
                          <Textarea 
                            value={exp.description || ''} 
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements"
                            rows={3}
                          />
                        </div>
                        
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => removeExperience(index)}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No experience added yet. Click the button above to add your work history.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="education" className="space-y-4">
          <div className="space-y-4">
            <Button onClick={addEducation} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
            
            {resumeData?.education?.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {resumeData.education.map((edu: any, index: number) => (
                  <AccordionItem key={index} value={`edu-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left">
                        {edu.institution || edu.degree ? 
                          `${edu.institution || 'Institution'} - ${edu.degree || 'Degree'}` : 
                          `Education ${index + 1}`}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div>
                          <label className="text-sm font-medium block mb-1">Institution</label>
                          <Input 
                            value={edu.institution || ''} 
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            placeholder="University or school name"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium block mb-1">Degree</label>
                          <Input 
                            value={edu.degree || ''} 
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            placeholder="Degree and field of study"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium block mb-1">Period</label>
                          <Input 
                            value={edu.period || ''} 
                            onChange={(e) => updateEducation(index, 'period', e.target.value)}
                            placeholder="e.g. 2015 - 2019"
                          />
                        </div>
                        
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => removeEducation(index)}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No education added yet. Click the button above to add your educational background.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-4">
          <div>
            <label htmlFor="skills" className="text-sm font-medium block mb-1">
              Skills (comma-separated)
            </label>
            <Textarea 
              id="skills" 
              placeholder="React, JavaScript, UI/UX Design, Project Management" 
              value={resumeData?.skills?.join(', ') || ''} 
              onChange={handleSkillsChange}
              rows={4}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
