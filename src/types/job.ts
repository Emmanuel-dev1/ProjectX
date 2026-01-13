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