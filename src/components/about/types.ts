import type { LucideIcon } from 'lucide-react';

export interface EthosMetric {
  value: string;
  label: string;
  description: string;
}

export interface HeritageBlock {
  title: string;
  subtitle: string;
  narrative: string[];
  image: string;
  imageAlt: string;
  caption: string;
  align: 'left' | 'right';
}

export interface LeadershipLead {
  id: string;
  name: string;
  role: string;
  experience: string;
  hometown: string;
  credentials: string[];
  languages: string[];
  bio: string;
  image: string;
  quote?: string;
}

export interface WelfarePrinciple {
  title: string;
  description: string;
  icon: LucideIcon;
}
