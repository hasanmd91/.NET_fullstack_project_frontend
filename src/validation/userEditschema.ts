import * as yup from 'yup';

export const userEditschema = yup
  .object({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string().min(6),
    avatar: yup.string(),
  })
  .required();
