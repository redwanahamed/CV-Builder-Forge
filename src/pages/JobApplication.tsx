
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import type { JobApplication as JobApplicationType } from "@/types/jobs";

// Mock jobs data (same as JobDetail)
const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    description: "We're looking for an experienced React developer to join our team.",
    requirements: ["5+ years React experience", "TypeScript knowledge", "Team leadership"],
    salary: "$120,000 - $150,000",
    type: "full-time",
    status: "open",
    postedDate: "2025-04-10",
    category: "Development",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "DesignWave",
    location: "New York, NY (Hybrid)",
    description: "Join our creative team to design beautiful user experiences.",
    requirements: ["3+ years design experience", "Figma proficiency", "UI/UX knowledge"],
    salary: "$90,000 - $110,000",
    type: "full-time",
    status: "open",
    postedDate: "2025-04-15",
    category: "Design",
    skills: ["Figma", "Adobe XD", "UI/UX", "Prototyping"]
  },
  {
    id: "3",
    title: "Content Writer",
    company: "WordSmiths Co.",
    location: "Remote",
    description: "Create engaging content for our clients across various industries.",
    requirements: ["Strong writing skills", "SEO knowledge", "Research abilities"],
    salary: "$60,000 - $80,000",
    type: "part-time",
    status: "open",
    postedDate: "2025-04-20",
    category: "Marketing",
    skills: ["Copywriting", "SEO", "Content Strategy", "Editing"]
  },
];

export default function JobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, userEmail } = useAuth();
  
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const job = mockJobs.find(job => job.id === id);
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setResumeFile(acceptedFiles[0]);
      }
    }
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const application: JobApplicationType = {
        id: uuidv4(),
        jobId: id || "",
        userId: "user123",  // In a real app, this would come from the auth context
        applicationDate: new Date().toISOString(),
        status: 'pending',
        coverLetter,
        resumeUrl: URL.createObjectURL(resumeFile)
      };
      
      console.log("Application submitted:", application);
      toast.success("Application submitted successfully!");
      setIsSubmitting(false);
      navigate("/profile", { state: { tab: "applications" } });
    }, 1500);
  };
  
  if (!isAuthenticated) {
    navigate(`/login?redirect=/jobs/${id}/apply`);
    return null;
  }
  
  if (!job) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
            <p className="mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/jobs')}>Browse All Jobs</Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-1"
          onClick={() => navigate(`/jobs/${id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to job details
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Apply for {job.title}</CardTitle>
                <CardDescription>At {job.company}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="resume">Resume/CV</Label>
                      <div
                        {...getRootProps()}
                        className="border-2 border-dashed border-border rounded-md p-6 mt-2 cursor-pointer hover:border-primary/50 transition-colors text-center"
                      >
                        <input {...getInputProps()} />
                        {resumeFile ? (
                          <div>
                            <p className="font-medium">{resumeFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                setResumeFile(null);
                              }}
                            >
                              Change file
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <p>Drag & drop your resume here, or click to select</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Accepts PDF, DOC, DOCX (max 5MB)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                      <Textarea
                        id="coverLetter"
                        className="mt-2 min-h-[200px]"
                        placeholder="Tell us why you're interested in this position and why you'd be a good fit..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">{job.title}</div>
                  <div className="text-muted-foreground">{job.company}</div>
                </div>
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-muted-foreground">{job.location}</div>
                </div>
                <div>
                  <div className="font-medium">Job Type</div>
                  <div className="text-muted-foreground capitalize">
                    {job.type.replace('-', ' ')}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="font-medium">Required Skills</div>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground mt-1 space-y-1">
                    {job.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
