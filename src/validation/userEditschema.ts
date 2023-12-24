import * as yup from 'yup';

export const userEditschema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();
