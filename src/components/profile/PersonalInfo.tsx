
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployeeProfile } from "@/types/jobs";

interface PersonalInfoProps {
  profile: EmployeeProfile;
  isEditing: boolean;
  onProfileChange: (field: string, value: string) => void;
}

export default function PersonalInfo({ profile, isEditing, onProfileChange }: PersonalInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Your basic information visible to employers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={profile.name} 
                onChange={(e) => onProfileChange('name', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input 
                id="title" 
                value={profile.title} 
                onChange={(e) => onProfileChange('title', e.target.value)} 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea 
                id="bio" 
                value={profile.bio} 
                onChange={(e) => onProfileChange('bio', e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={profile.location} 
                onChange={(e) => onProfileChange('location', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input 
                id="email" 
                value={profile.contactEmail}
                onChange={(e) => onProfileChange('contactEmail', e.target.value)} 
                type="email"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-primary">{profile.title}</p>
              <p className="text-sm text-muted-foreground">{profile.location}</p>
            </div>
            <p>{profile.bio}</p>
            <div>
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <p className="text-sm">
                Email: {profile.contactEmail}<br />
                Phone: {profile.phone}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
