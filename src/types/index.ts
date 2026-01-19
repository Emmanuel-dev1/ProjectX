export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'job' | 'proposal' | 'payment' | 'message';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'freelancer';
  avatar?: string;
}

// Add any other existing interfaces below...

// Job types
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

// Notification types
export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'job' | 'proposal' | 'payment' | 'message';
}

// User types
export interface User {
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
}

// Filter types
export interface FilterState {
  experienceLevels: string[];
  paymentTypes: string[];
  categories: string[];
}