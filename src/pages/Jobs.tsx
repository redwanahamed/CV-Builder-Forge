
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Briefcase, MapPin, Calendar } from 'lucide-react';
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all-types");
  const [filterLocation, setFilterLocation] = useState<string>("all-locations");
  
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all-types" || job.type === filterType;
    const matchesLocation = filterLocation === "all-locations" || job.location.includes(filterLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">Find Your Perfect Job</h1>
            <p className="text-muted-foreground">Browse through hundreds of job opportunities</p>
          </div>
          <Button className="mt-4 md:mt-0" asChild>
            <Link to="/post-job">Post a Job</Link>
          </Button>
        </div>
        
        <div className="bg-card rounded-lg p-4 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, or keywords"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="London">London</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-primary">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant={job.type === 'full-time' ? 'default' : 'outline'}>
                      {job.type.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
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
                      Posted {formatDate(job.postedDate)}
                    </div>
                  </div>
                  
                  <p className="text-sm line-clamp-2 mb-4">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="pt-4 flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to={`/jobs/${job.id}`}>View Details</Link>
                  </Button>
                  <Button asChild>
                    <Link to={`/jobs/${job.id}/apply`}>Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
