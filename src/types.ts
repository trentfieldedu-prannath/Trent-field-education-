export type PageType = 'home' | 'about' | 'diploma' | 'undergraduate' | 'postgraduate' | 'dba-phd' | 'study-abroad' | 'contact' | 'lms';

export interface NavItem {
  label: string;
  id: PageType;
  children?: NavItem[];
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Program {
  title: string;
  id: PageType;
  description: string;
  image: string;
}

export interface Country {
  name: string;
  description: string;
  flag: string;
  features: string[];
}
