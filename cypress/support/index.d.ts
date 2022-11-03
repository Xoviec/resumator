declare interface Resume {
  projects: [];
  introduction: string;
  education: [];
  experience: [];
  personalia: {
    lastName: string;
    dateOfBirth: null;
    firstName: string;
    email: string;
    city: string;
  };
  isImport: false;
  isArchived: false;
  skills: [];
  id: string;
  publications: [];
  sideProjects: [];
}

interface Resumes {
  resumes: Resume[];
}
