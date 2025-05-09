
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobApplication } from "@/types/jobs";
import { Calendar, Eye, Briefcase } from "lucide-react";

interface JobApplicationsProps {
  applications?: JobApplication[];
}

// Mock job data (in a real app, this would be fetched from an API)
const mockJobs = [
  { id: "1", title: "Senior React Developer", company: "TechCorp Inc." },
  { id: "2", title: "UX/UI Designer", company: "DesignWave" },
  { id: "3", title: "Content Writer", company: "WordSmiths Co." },
];

const mockApplications: JobApplication[] = [
  {
    id: "app1",
    jobId: "1",
    userId: "user123",
    applicationDate: "2025-04-20T10:30:00Z",
    status: "pending",
    coverLetter: "I'm excited to apply for this role...",
    resumeUrl: "#"
  }
];

export default function JobApplications({ applications = mockApplications }: JobApplicationsProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'destructive';
      case 'interview': return 'default';
      case 'reviewed': return 'secondary';
      default: return 'outline';
    }
  };

  const getJobDetailsById = (jobId: string) => {
    return mockJobs.find(job => job.id === jobId) || { title: "Unknown Job", company: "Unknown Company" };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Job Applications</CardTitle>
        <CardDescription>Track your application status</CardDescription>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
            <Button className="mt-4" asChild>
              <a href="/jobs">Browse Jobs</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => {
              const job = getJobDetailsById(application.jobId);
              return (
                <div key={application.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h3 className="font-medium text-lg">{job.title}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge 
                      variant={getStatusBadgeVariant(application.status) as any} 
                      className="capitalize"
                    >
                      {application.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    Applied on {formatDate(application.applicationDate)}
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={application.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        View Resume
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={`/jobs/${application.jobId}`} className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        View Job
                      </a>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
