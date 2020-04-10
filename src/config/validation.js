import * as yup from "yup";

export default yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.date(),
  city: yup.string().required(),
  introduction: yup.string().required().max(200),
});
