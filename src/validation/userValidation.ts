import * as yup from 'yup';

export const userSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    avatar: yup.string().required(),
    address: yup.string().required(),
    zip: yup.string().required(),
    city: yup.string().required(),
  })
  .required();
