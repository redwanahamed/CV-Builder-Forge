
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit } from 'lucide-react';

interface ProfileHeaderProps {
  isEditing: boolean;
  onEditClick: () => void;
  onSaveClick: () => void;
}

export default function ProfileHeader({ isEditing, onEditClick, onSaveClick }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <h1 className="text-3xl font-serif font-bold">Your Professional Profile</h1>
      {!isEditing ? (
        <Button className="mt-4 md:mt-0" onClick={onEditClick}>
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      ) : (
        <Button className="mt-4 md:mt-0" onClick={onSaveClick}>
          Save Changes
        </Button>
      )}
    </div>
  );
}
