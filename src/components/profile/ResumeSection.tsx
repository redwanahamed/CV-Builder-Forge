
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResumeDropZone from "@/components/resume/ResumeDropZone";

interface ResumeSectionProps {
  cvUrl: string;
  onCvUpload: (file: File) => void;
}

export default function ResumeSection({ cvUrl, onCvUpload }: ResumeSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your CV</CardTitle>
        <CardDescription>Upload and manage your resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ResumeDropZone onFileAccepted={onCvUpload} />
        
        {cvUrl && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">Current Resume</h3>
            <div className="border rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">My_Professional_Resume.pdf</p>
                <p className="text-sm text-muted-foreground">Uploaded on {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer">View</a>
                </Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
