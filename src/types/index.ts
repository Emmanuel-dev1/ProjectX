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
  rating?: number;
  completedJobs?: number;
  company?: string; // For clients
  companyLogo?: string; // For clients
}

export interface Job {
  id: string;
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
  clientId: string; // Add client reference
  status: 'open' | 'closed' | 'in_progress';
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  clientId: string;
  coverLetter: string;
  bidAmount: number;
  estimatedTime: string; // e.g., "2 weeks", "1 month"
  attachments?: string[]; // File URLs
  submittedAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  freelancer?: User;
  job?: Job;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  proposalId?: string;
  jobId?: string;
  sender?: User;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'job' | 'proposal' | 'payment' | 'message' | 'system';
  userId: string;
  metadata?: {
    proposalId?: string;
    jobId?: string;
    messageId?: string;
  };
}

export interface FilterState {
  experienceLevels: string[];
  paymentTypes: string[];
  categories: string[];
}