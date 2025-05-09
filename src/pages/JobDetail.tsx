
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Calendar, Building, Clock } from 'lucide-react';
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock jobs data (in a real app, this would come from an API)
const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    description: "We're looking for an experienced React developer to join our team. As a Senior React Developer, you'll be responsible for building high-performance web applications using modern front-end technologies. You'll collaborate with designers, product managers, and other engineers to deliver outstanding user experiences.",
    requirements: ["5+ years React experience", "TypeScript knowledge", "Team leadership", "Experience with state management libraries", "Strong problem-solving skills"],
    responsibilities: [
      "Develop and maintain front-end applications using React, TypeScript, and related technologies",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Ensure the technical feasibility of UI/UX designs",
      "Optimize applications for maximum speed and scalability",
      "Identify and correct bottlenecks and bugs"
    ],
    salary: "$120,000 - $150,000",
    type: "full-time",
    status: "open",
    postedDate: "2025-04-10",
    closingDate: "2025-05-30",
    category: "Development",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "DesignWave",
    location: "New York, NY (Hybrid)",
    description: "Join our creative team to design beautiful user experiences. We're seeking a talented UX/UI Designer to create intuitive and engaging user interfaces for web and mobile applications.",
    requirements: ["3+ years design experience", "Figma proficiency", "UI/UX knowledge", "Portfolio demonstrating UI/UX projects", "User research experience"],
    responsibilities: [
      "Create user-centered designs by understanding business requirements and user feedback",
      "Create user flows, wireframes, prototypes and mockups",
      "Design UI elements and tools such as navigation menus, search boxes, tabs, and widgets",
      "Develop UI mockups and prototypes that clearly illustrate how sites function and look",
      "Conduct usability testing and gather feedback"
    ],
    salary: "$90,000 - $110,000",
    type: "full-time",
    status: "open",
    postedDate: "2025-04-15",
    closingDate: "2025-05-20",
    category: "Design",
    skills: ["Figma", "Adobe XD", "UI/UX", "Prototyping"]
  },
  {
    id: "3",
    title: "Content Writer",
    company: "WordSmiths Co.",
    location: "Remote",
    description: "Create engaging content for our clients across various industries. We're looking for a talented Content Writer to join our team and help create compelling copy for websites, blogs, social media, and marketing materials.",
    requirements: ["Strong writing skills", "SEO knowledge", "Research abilities", "Excellent grammar and proofreading skills", "Portfolio of writing samples"],
    responsibilities: [
      "Create engaging content for various platforms including websites, blogs, social media, and marketing materials",
      "Research industry topics to produce original content",
      "Proofread and edit content for grammar, spelling, and clarity",
      "Optimize content for SEO using relevant keywords and phrases",
      "Collaborate with designers, marketers, and other team members to produce cohesive content"
    ],
    salary: "$60,000 - $80,000",
    type: "part-time",
    status: "open",
    postedDate: "2025-04-20",
    closingDate: "2025-05-25",
    category: "Marketing",
    skills: ["Copywriting", "SEO", "Content Strategy", "Editing"]
  },
];

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const job = mockJobs.find(job => job.id === id);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
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
          onClick={() => navigate('/jobs')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all jobs
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-serif mb-2">
                      {job.title}
                    </CardTitle>
                    <div className="text-lg font-medium text-primary">
                      {job.company}
                    </div>
                  </div>
                  <Badge variant={job.type === 'full-time' ? 'default' : 'outline'} className="capitalize">
                    {job.type.replace('-', ' ')}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {job.salary || "Salary not specified"}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted: {formatDate(job.postedDate)}
                  </div>
                  {job.closingDate && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Closing: {formatDate(job.closingDate)}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Job Description</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>
                
                {job.responsibilities && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Responsibilities</h3>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      {job.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Requirements</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
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
                  <div className="font-medium">Company</div>
                  <div className="text-muted-foreground flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {job.company}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Category</div>
                  <div className="text-muted-foreground">{job.category}</div>
                </div>
                <div>
                  <div className="font-medium">Job Type</div>
                  <div className="text-muted-foreground capitalize">{job.type.replace('-', ' ')}</div>
                </div>
                
                <Separator />
                
                <Button className="w-full" size="lg" asChild>
                  <a href={`/jobs/${job.id}/apply`}>Apply for this job</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
