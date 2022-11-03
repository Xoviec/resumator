import { PersonaliaModel } from "../components/LivePreviewerComponents/TopSection";

const educations = [
  {
    name: "Hogeschool van Utrecht",
    institute: "Bedrijfsinformatica",
    startDate: new Date(2012, 6, 1),
    endDate: new Date(2016, 5, 31),
  },
  {
    name: "Universiteit van Amsterdam",
    institute: "Informatica",
    startDate: new Date(2016, 6, 1),
    endDate: new Date(2020, 5, 31),
  },
];

const personalia: PersonaliaModel = {
  city: "Utrecht",
  countryCode: "NL",
  dateOfBirth: new Date(1990, 23, 4),
  email: "johndoe@frontmen.nl",
  firstName: "John",
  lastName: "Doe",
  role: "Frontend developer",
};

const projects = [
  {
    role: "Frontend Developer",
    company: "Rabobank",
    startDate: new Date(2021, 4, 1),
    endDate: new Date(2021, 12, 31),
    description: "Some description",
    stackAndTechniques: [{ name: "React" }, { name: "Redux" }],
  },
  {
    role: "Frontend Developer",
    company: "KPN",
    startDate: new Date(2020, 3, 31),
    endDate: new Date(2019, 8, 1),
    description: "Some description",
    stackAndTechniques: [{ name: "React" }, { name: "Angular" }],
  },
];

const publications = [
  {
    description: "Description of publication 1",
    link: "https://www.publication1.com",
    title: "Publication 1",
  },
  {
    description: "Description of publication 2",
    link: "https://www.publication2.com",
    title: "Publication 2",
  },
];

const skills = [
  {
    isActive: true,
    label: "React",
    name: "React",
    value: "React",
  },
  {
    isActive: true,
    label: "Angular",
    name: "Angular",
    value: "Angular",
  },
  {
    isActive: true,
    label: "Vue",
    name: "Vue",
    value: "Vue",
  },
];

const sideProjects = [
  {
    description: "Description of side project 1",
    link: "https://www.sideproject2.com",
    title: "Publication 1",
  },
  {
    description: "Description of side project 2",
    link: "https://www.sideproject1.com",
    title: "Publication 2",
  },
];

const socialLinks = [
  {
    link: "https://github.com/johndoe",
    linkType: "github",
    title: null,
  },
];

const workExperiences = [
  {
    role: "Frontend Developer",
    company: "Frontmen",
    startDate: new Date(2015, 4, 1),
    endDate: null,
    description: "Some description",
    stackAndTechniques: [{ name: "React" }, { name: "Redux" }],
  },
  {
    role: "Frontend Developer",
    company: "Startup",
    startDate: new Date(2012, 4, 1),
    endDate: new Date(2015, 3, 31),
    description: "Some description",
    stackAndTechniques: [{ name: "React" }, { name: "Angular" }],
  },
];

const resume = {
  education: educations,
  experience: workExperiences,
  id: "1",
  introduction: "Introduction",
  isArchived: false,
  isImport: false,
  motivation: "Motivation",
  personalia,
  projects,
  publications,
  sideProjects,
  skills,
  socialLinks,
  userId: "1",
};

export {
  educations,
  personalia,
  projects,
  publications,
  resume,
  sideProjects,
  skills,
  socialLinks,
  workExperiences,
};
