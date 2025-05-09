
export type JobStatus = 'open' | 'closed' | 'draft';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities?: string[];
  salary?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: JobStatus;
  postedDate: string;
  closingDate?: string;
  category: string;
  skills: string[];
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  industry: string;
  size?: string;
  location: string;
  jobs: string[]; // Array of job IDs
}

export interface EmployeeProfile {
  id?: string;
  userId?: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  cvUrl: string;
  contactEmail: string;
  phone: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  applicationDate: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'accepted';
  coverLetter?: string;
  resumeUrl: string;
}
