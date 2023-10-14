import * as yup from 'yup';

export const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')])
      .required(),
    avatar: yup.string().required(),
  })
  .required();
