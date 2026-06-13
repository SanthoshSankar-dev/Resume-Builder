export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: {
    technical: string[];
    soft: string[];
  };
  projects: Project[];
  certifications: Certification[];
}

export type TemplateType = 'minimal' | 'professional' | 'creative' | 'executive' | 'modern' | 'elegant';

export interface ResumeState {
  data: ResumeData;
  template: TemplateType;
  currentStep: number;
}

export const STEPS = [
  { id: 1, name: 'Personal', description: 'Basic information' },
  { id: 2, name: 'Summary', description: 'Professional summary' },
  { id: 3, name: 'Education', description: 'Academic background' },
  { id: 4, name: 'Experience', description: 'Work history' },
  { id: 5, name: 'Skills', description: 'Technical & soft skills' },
  { id: 6, name: 'Projects', description: 'Portfolio projects' },
  { id: 7, name: 'Certifications', description: 'Awards & certificates' },
] as const;

export const emptyResumeData: ResumeData = {
  personalDetails: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: {
    technical: [],
    soft: [],
  },
  projects: [],
  certifications: [],
};
