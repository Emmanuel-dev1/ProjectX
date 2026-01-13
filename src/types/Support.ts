export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  popular: boolean;
}

export interface SupportChannel {
  icon: React.ReactNode;
  title: string;
  description: string;
  availability: string;
  responseTime: string;
  action: string;
}

export interface Article {
  id: number;
  title: string;
  category: string;
  views: string;
  readTime: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  count: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}