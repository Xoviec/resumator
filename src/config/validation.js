import * as yup from "yup";

export default yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.string().required(),
  city: yup.string().required(),
  introduction: yup.string().required(),
});
