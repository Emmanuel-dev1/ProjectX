export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'job' | 'proposal' | 'payment' | 'message';
  link?: string;
}

export interface UserMenuOption {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  danger?: boolean;
  toggle?: boolean;
  submenu?: LanguageOption[];
  current?: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}