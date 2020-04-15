import * as yup from "yup";

export const MIN_NUMBER_OF_EXPERIENCE = 1;
export const MIN_NUMBER_OF_EDUCATION = 1;

yup.setLocale({
  mixed: {
    default: "Invalid value",
    notType: "Invalid value",
    required: "Cannot be empty",
  },
  number: {
    // eslint-disable-next-line
    min: "Should atleast contain ${min} entry",
  },
});

const experienceSchema = yup.object().shape({
  company: yup.string().required(),
  role: yup.string().required(),
  from: yup.date().required(),
  untill: yup.date().required(),
  description: yup.string().required().max(200),
  stackAndTechniques: yup.array().min(1),
});

export default yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.date().required(),
  city: yup.string().required(),
  introduction: yup.string().required().max(200),
  experience: yup.array().min(MIN_NUMBER_OF_EXPERIENCE).of(experienceSchema),
  projects: yup.array().of(experienceSchema),
  education: yup
    .array()
    .min(MIN_NUMBER_OF_EDUCATION)
    .of(
      yup.object().shape({
        institute: yup.string().required(),
        name: yup.string().required(),
        level: yup.string(),
        startDate: yup.date().required(),
        endDate: yup.date().required(),
      })
    ),
  skill: yup.array().min(1),
});
