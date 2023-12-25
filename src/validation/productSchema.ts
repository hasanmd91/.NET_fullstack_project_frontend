import * as yup from 'yup';

export const productSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .integer('Quantity must be an integer')
    .positive('Quantity must be greater than zero')
    .required('Quantity is required'),
  categoryId: yup.string().required('Category ID is required'),
  images: yup
    .array()
    .of(
      yup.object().shape({
        imageUrl: yup
          .string()
          .url('Image URL must be a valid URL')
          .required('Image URL is required'),
      })
    )
    .required('At least one image is required'),
});

export const catgorySchema = yup.object().shape({
  name: yup.string().required('name is required'),
  id: yup.string(),
});
