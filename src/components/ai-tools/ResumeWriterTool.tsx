
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ResumeWriterTool() {
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("mid-level");
  const [skills, setSkills] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!jobTitle) {
      toast.error("Please enter a job title");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock response based on inputs
      const mockAIResponse = `
# ${jobTitle.toUpperCase()} - ${experience === 'entry-level' ? 'Entry Level' : experience === 'mid-level' ? 'Mid-Level' : 'Senior Level'} Professional

## PROFESSIONAL SUMMARY
Results-driven ${jobTitle} with ${experience === 'entry-level' ? 'foundational' : experience === 'mid-level' ? 'extensive' : 'exceptional'} expertise in ${jobTitle.toLowerCase()} methodologies and implementation. Passionate about delivering high-quality solutions while continuously improving processes.

## SKILLS
${skills.split(',').map(skill => `• ${skill.trim()}`).join('\n')}

## WORK EXPERIENCE
### ${jobTitle} | Example Company
${experience === 'entry-level' 
  ? '- Assisted senior staff with project planning and implementation' 
  : experience === 'mid-level' 
  ? '- Led multiple projects from concept to completion, resulting in 25% efficiency increase'
  : '- Directed strategic initiatives leading to $1.2M in cost savings'}
${experience === 'entry-level'
  ? '- Collaborated in team settings to achieve project milestones'
  : experience === 'mid-level'
  ? '- Mentored junior team members while contributing to departmental goals'
  : '- Managed cross-functional teams of 15+ professionals across multiple departments'}

## EDUCATION
Bachelor's Degree in ${jobTitle.includes('Developer') ? 'Computer Science' : jobTitle.includes('Design') ? 'Design' : 'Business Administration'}
`;
      
      setOutput(mockAIResponse);
      toast.success("Resume content generated successfully!");
    } catch (error) {
      toast.error("Error generating content. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="job-title">Job Title</Label>
        <Input 
          id="job-title" 
          placeholder="e.g., Software Developer, UX Designer"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience-level">Experience Level</Label>
        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entry-level">Entry-level</SelectItem>
            <SelectItem value="mid-level">Mid-level</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Textarea 
          id="skills" 
          placeholder="e.g., JavaScript, React, TypeScript"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>
      
      <Button 
        onClick={handleGenerate} 
        disabled={isLoading} 
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Resume Content'
        )}
      </Button>

      {output && (
        <div className="mt-6 space-y-2">
          <Label>Generated Content</Label>
          <div className="border p-4 rounded-md bg-muted/30 whitespace-pre-line">
            {output}
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigator.clipboard.writeText(output)}
            className="w-full mt-2"
          >
            Copy to Clipboard
          </Button>
        </div>
      )}
    </div>
  );
}
