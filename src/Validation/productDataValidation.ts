import * as yup from 'yup';

export const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    categoryId: yup.number().required(),
    images: yup.string().required(),
  })
  .required();
