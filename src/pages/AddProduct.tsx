import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newProduct } from '../types/product';
import { productSchema } from '../validation/productSchema';
import TextField from '../components/TextField/TextField';
import Button from '../components/Button/Button';
import useAppDispatch from '../hooks/useAppDispatch';
import { createNewProductAsync } from '../redux/thunks/productThunk';

const AddProduct = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const dispatch = useAppDispatch();

  const submitHandeler: SubmitHandler<newProduct> = (data: newProduct) => {
    dispatch(createNewProductAsync(data));
  };

  return (
    <form onSubmit={handleSubmit(submitHandeler)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            label="Title"
            {...field}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            label="Description"
            {...field}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            label="Price"
            type="number"
            {...field}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        )}
      />
      <Controller
        name="quantity"
        control={control}
        render={({ field }) => (
          <TextField
            label="Quantity"
            type="number"
            {...field}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
          />
        )}
      />
      <Controller
        name="CategoryId"
        control={control}
        render={({ field }) => (
          <TextField
            label="Category ID"
            {...field}
            error={!!errors.CategoryId}
            helperText={errors.CategoryId?.message}
          />
        )}
      />
      <Controller
        name={`images.${0}.imageUrl`}
        control={control}
        render={({ field }) => (
          <TextField
            label="Image URL 1"
            {...field}
            error={!!errors.images?.[0]?.imageUrl}
            helperText={errors.images?.[0]?.imageUrl?.message}
          />
        )}
      />
      <Controller
        name={`images.${1}.imageUrl`}
        control={control}
        render={({ field }) => (
          <TextField
            label="Image URL 2"
            {...field}
            error={!!errors.images?.[1]?.imageUrl}
            helperText={errors.images?.[1]?.imageUrl?.message}
          />
        )}
      />
      <Controller
        name={`images.${2}.imageUrl`}
        control={control}
        render={({ field }) => (
          <TextField
            label="Image URL 3"
            {...field}
            error={!!errors.images?.[2]?.imageUrl}
            helperText={errors.images?.[2]?.imageUrl?.message}
          />
        )}
      />
      <Button fullWidth>Submit</Button>
    </form>
  );
};

export default AddProduct;
