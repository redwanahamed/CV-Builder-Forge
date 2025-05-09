
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInfo from "@/components/profile/PersonalInfo";
import SkillsSection from "@/components/profile/SkillsSection";
import ExperienceSection from "@/components/profile/ExperienceSection";
import ResumeSection from "@/components/profile/ResumeSection";
import JobApplications from "@/components/profile/JobApplications";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmployeeProfile as IEmployeeProfile } from "@/types/jobs";

export default function EmployeeProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState<IEmployeeProfile>({
    id: "1", // Added ID
    userId: "user123", // Added userID
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    bio: "Experienced frontend developer with 6+ years of experience building modern web applications with React and TypeScript.",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "NextJS", "Tailwind CSS", "GraphQL"],
    experience: [
      {
        id: "1",
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "2023-01",
        current: true,
        description: "Lead developer for the company's main product suite."
      },
      {
        id: "2",
        title: "Frontend Developer",
        company: "WebSolutions",
        location: "Remote",
        startDate: "2020-06",
        endDate: "2022-12",
        current: false,
        description: "Developed responsive web applications using React and TypeScript."
      }
    ],
    education: [
      {
        id: "1",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2016",
        endDate: "2020",
        current: false
      }
    ],
    cvUrl: "",
    contactEmail: "alex@example.com",
    phone: "+1 (555) 123-4567",
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      website: "https://alexjohnson.dev"
    }
  });
  
  // Check if we should show a specific tab based on navigation state
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  
  const handleCvUpload = (file: File) => {
    const mockUrl = URL.createObjectURL(file);
    setProfile({
      ...profile,
      cvUrl: mockUrl
    });
    toast.success("CV uploaded successfully");
  };
  
  const saveProfile = () => {
    setIsEditing(false);
    toast.success("Profile saved successfully");
  };
  
  const handleProfileChange = (field: string, value: string) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };
  
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProfileHeader 
          isEditing={isEditing}
          onEditClick={() => setIsEditing(true)}
          onSaveClick={saveProfile}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-8">
            <PersonalInfo 
              profile={profile}
              isEditing={isEditing}
              onProfileChange={handleProfileChange}
            />
            
            <SkillsSection 
              skills={profile.skills}
              isEditing={isEditing}
              onSkillsChange={(skills) => setProfile({ ...profile, skills })}
            />
            
            <ExperienceSection 
              experience={profile.experience}
              isEditing={isEditing}
              onExperienceChange={(experience) => setProfile({ ...profile, experience })}
            />
          </TabsContent>
          
          <TabsContent value="resume" className="space-y-8">
            <ResumeSection 
              cvUrl={profile.cvUrl || ''}
              onCvUpload={handleCvUpload}
            />
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-8">
            <JobApplications />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
