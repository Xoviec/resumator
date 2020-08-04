export interface Personalia {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    city: string;
}
export interface Education {
  id?: string;
  certificate?: boolean;
  institute?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
}
export interface Experience {
  id: string;
  role: string;
  company: string;
  stackAndTechniques: [{ name: string }];
  startDate: string;
  endDate: string;
}
export interface Project {
  id: string;
  role: string;
  company: string;
  stackAndTechniques: [{ name: string }];
  startDate: string;
  endDate: string;
}
export interface SideProject { 
  id: string; 
  link: string; 
  description: string 
}
export interface Publication { 
  id: string; 
  link: string; 
  description: string 
}

export interface Resume {
  personalia: Personalia
  education: Education[];
  introduction: string;
  avatar: string;
  skills: { name: string }[];
  sideProjects: SideProject[];
  publications: Publication[];
  experience: Experience[];
  projects: Project[];
}

export type Opts = {
  centered?: boolean;
  getImage?: any;
  getSize?: (img: string, tagValue: string, tagName: string) => number[];
};

export interface ParsedQs {
  [key: string]: string | string[] | ParsedQs | ParsedQs[];
}
