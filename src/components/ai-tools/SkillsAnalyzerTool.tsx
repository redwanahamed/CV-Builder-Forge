
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Skill {
  name: string;
  rating: number;
  feedback: string;
  suggestedResources?: string[];
}

export function SkillsAnalyzerTool() {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [industry, setIndustry] = useState<string>("tech");
  const [skills, setSkills] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<Skill[]>([]);

  const handleAnalyze = async () => {
    if (!jobTitle) {
      toast.error("Please enter a job title");
      return;
    }
    
    if (!skills.trim()) {
      toast.error("Please enter your skills");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Parse skills and create mock analysis
      const skillList = skills.split(',').map(skill => skill.trim());
      
      // Define industry-specific required skills
      const industryRequiredSkills: Record<string, string[]> = {
        "tech": ["JavaScript", "Python", "React", "Node.js", "AWS", "CI/CD", "Git", "REST API"],
        "finance": ["Financial Analysis", "Excel", "Modeling", "Accounting", "Regulations", "Risk Assessment"],
        "marketing": ["Social Media", "Content Creation", "SEO", "Analytics", "Campaign Management", "Copywriting"],
        "design": ["UI/UX", "Figma", "Adobe Suite", "Wireframing", "Prototyping", "Typography"]
      };
      
      // Select the appropriate industry skills or default to tech
      const requiredSkills = industryRequiredSkills[industry] || industryRequiredSkills.tech;
      
      // Generate analysis for each skill
      const skillAnalysis: Skill[] = [];
      
      skillList.forEach(skill => {
        // Check if the skill is in the required skills list
        const isRequired = requiredSkills.some(req => 
          req.toLowerCase().includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(req.toLowerCase())
        );
        
        // Generate random score, weighted higher if skill is required
        const baseScore = isRequired ? 60 : 40;
        const variance = 40;
        const randomScore = Math.min(100, Math.max(30, baseScore + (Math.random() * variance - variance/2)));
        
        // Round to nearest 5
        const rating = Math.round(randomScore / 5) * 5;
        
        // Generate feedback based on rating
        let feedback = "";
        let suggestedResources: string[] = [];
        
        if (rating >= 80) {
          feedback = `Your ${skill} skills are excellent and highly relevant for ${jobTitle} roles in the ${industry} industry.`;
          suggestedResources = [`Advanced ${skill} certification`, `${skill} leadership workshop`];
        } else if (rating >= 60) {
          feedback = `Your ${skill} skills are good but could benefit from some advanced training for ${jobTitle} positions.`;
          suggestedResources = [`Intermediate ${skill} course`, `${skill} practice projects`];
        } else {
          feedback = `Your ${skill} skills need significant improvement to be competitive for ${jobTitle} roles.`;
          suggestedResources = [`${skill} fundamentals course`, `${skill} for beginners tutorial`];
        }
        
        if (isRequired) {
          feedback += " This is a key skill for your target role.";
        } else {
          feedback += " This skill is useful but not critical for your target role.";
        }
        
        skillAnalysis.push({
          name: skill,
          rating,
          feedback,
          suggestedResources
        });
      });
      
      // Add suggestions for missing critical skills
      const userSkillsLower = skillList.map(s => s.toLowerCase());
      const missingCriticalSkills = requiredSkills.filter(skill => 
        !userSkillsLower.some(userSkill => 
          userSkill.includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(userSkill)
        )
      );
      
      if (missingCriticalSkills.length > 0) {
        missingCriticalSkills.forEach(skill => {
          skillAnalysis.push({
            name: skill,
            rating: 0,
            feedback: `You don't have ${skill} listed in your skills, which is critical for ${jobTitle} roles in the ${industry} industry. Consider developing this skill to increase your marketability.`,
            suggestedResources: [`${skill} for beginners`, `Introduction to ${skill} course`]
          });
        });
      }
      
      setAnalysis(skillAnalysis);
      toast.success("Skills analysis completed!");
    } catch (error) {
      toast.error("Error analyzing skills. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressColor = (rating: number) => {
    if (rating >= 80) return "bg-green-500";
    if (rating >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="job-title">Target Job Title</Label>
        <Input 
          id="job-title" 
          placeholder="e.g., Software Engineer, Financial Analyst"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="skills">Your Skills (comma-separated)</Label>
        <Textarea 
          id="skills" 
          placeholder="e.g., JavaScript, React, Project Management"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          rows={4}
        />
      </div>
      
      <Button 
        onClick={handleAnalyze} 
        disabled={isLoading || !jobTitle || !skills.trim()} 
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing Skills...
          </>
        ) : (
          'Analyze Skills Gap'
        )}
      </Button>

      {analysis.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Skills Analysis</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Based on {analysis.length} skills analyzed for {jobTitle} positions in the {industry === "tech" ? "Technology" : industry === "finance" ? "Finance" : industry === "marketing" ? "Marketing" : "Design"} industry.
          </p>
          
          <div className="space-y-4">
            {analysis.map((skill, idx) => (
              <Card key={idx}>
                <CardHeader className="py-3">
                  <CardTitle className="text-md flex justify-between items-center">
                    <span>{skill.name}</span>
                    {skill.rating > 0 && (
                      <span className="text-sm font-normal">{skill.rating}/100</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2 space-y-3">
                  {skill.rating > 0 ? (
                    <Progress 
                      value={skill.rating} 
                      className={`h-2 ${getProgressColor(skill.rating)}`} 
                    />
                  ) : (
                    <div className="text-xs font-medium text-destructive uppercase mb-2">Missing Skill</div>
                  )}
                  
                  <p className="text-sm">{skill.feedback}</p>
                  
                  {skill.suggestedResources && skill.suggestedResources.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium mb-1">Recommended Resources:</p>
                      <ul className="text-xs text-muted-foreground list-disc list-inside">
                        {skill.suggestedResources.map((resource, i) => (
                          <li key={i}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
