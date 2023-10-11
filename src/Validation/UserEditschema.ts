import * as yup from 'yup';

export const UserEditschema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();
