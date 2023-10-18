import * as yup from 'yup';

export const newProductSchema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required('price is required'),
    categoryId: yup.number().required('categoryId is required'),
    images: yup
      .array(yup.string().url('Must be a image url').required())
      .required(),
  })
  .required();
