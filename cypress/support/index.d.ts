declare interface Resume {
  projects: [];
  introduction: string;
  education: [];
  experience: [];
  personalia: {
    avatar: string;
    lastName: string;
    dateOfBirth: null;
    firstName: string;
    email: string;
    city: string;
  };
  isImport: false;
  isArchived: false;
  skills: [];
  avatar: string;
  id: string;
  publications: [];
  sideProjects: [];
}

interface Resumes {
  resumes: Resume[];
}
