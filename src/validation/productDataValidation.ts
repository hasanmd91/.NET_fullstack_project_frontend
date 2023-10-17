import * as yup from 'yup';

export const newProductSchema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    categoryId: yup.number().required(),
    images: yup.array(yup.string().url().required()).required(),
  })
  .required();
