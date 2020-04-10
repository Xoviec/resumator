import * as yup from "yup";

export default yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.date().required(),
  city: yup.string().required(),
  introduction: yup.string().required().max(200),
  experience: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        company: yup.string().required(),
        role: yup.string().required(),
        from: yup.date().required(),
        untill: yup.date().required(),
        description: yup.string().required().max(200),
        stackAndTechniques: yup.array().min(1),
      })
    ),
  edution: yup
    .array()
    .min(1)
    .of(
      yup.object.shape({
        institute: yup.string().required(),
        name: yup.string().required(),
        level: yup.string(),
        startDate: yup.date().required(),
        endDate: yup.date().required(),
      })
    ),
  skill: yup.array().min(1),
});
