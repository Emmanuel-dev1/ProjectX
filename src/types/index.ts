// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'freelancer';
  avatarInitials: string;
  profileImage?: string;
  phone?: string;
  location?: string;
  website?: string;
  title?: string;
  bio?: string;
  skills?: string[];
}

export interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  salaryType: 'Hourly Rate' | 'Fixed Budget';
  type: 'Entry' | 'Intermediate' | 'Advanced';
  postedDate: string;
  description: string;
  proposals: number;
  tags: string[];
  isSaved: boolean;
  category: 'Website Design' | 'Mobile App Design' | 'Website Development' | 'Mobile App Development' | 'Copywriting';
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'job' | 'proposal' | 'payment' | 'message';
}

export interface FilterState {
  experienceLevels: string[];
  paymentTypes: string[];
  categories: string[];
}