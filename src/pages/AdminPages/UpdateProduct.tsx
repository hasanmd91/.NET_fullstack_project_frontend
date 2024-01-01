import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newProduct } from '../../types/product';
import { productSchema } from '../../validation/productSchema';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  getAProductsAsync,
  updateProductAsync,
} from '../../redux/thunks/productThunk';
import { useParams } from 'react-router-dom';
import useAppSelector from '../../hooks/useAppSelector';
import {
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import CenteredContainer from '../../components/CenterContainer/CenterContainer';
import { category } from './../../types/category';

const UpdateProduct = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const dispatch = useAppDispatch();

  const { product } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch(getAProductsAsync(id));
  }, [dispatch, id]);

  const submitHandeler: SubmitHandler<newProduct> = (data: newProduct) => {
    id && dispatch(updateProductAsync({ id: id, updatedData: data }));
    reset();
  };

  if (!product) {
    return (
      <CenteredContainer>
        <CircularProgress color="error" size="5rem" />
      </CenteredContainer>
    );
  }

  return (
    <form onSubmit={handleSubmit(submitHandeler)}>
      <Controller
        name="title"
        defaultValue={product.title}
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
        defaultValue={product.description}
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
        defaultValue={product.price}
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
        defaultValue={product.quantity}
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
      <FormControl fullWidth>
        <InputLabel id="categoryId-label">Category ID</InputLabel>
        <Controller
          name="categoryId"
          defaultValue={product.categoryId}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="categoryId-label"
              label="Category"
              error={!!errors.categoryId}
            >
              {categories?.map((category: category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.categoryId && (
          <Alert severity="error">{errors.categoryId.message}</Alert>
        )}
      </FormControl>
      <Controller
        name={`images.${0}.imageUrl`}
        defaultValue={product?.images[0]?.imageUrl}
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
        defaultValue={product?.images[1]?.imageUrl}
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
        defaultValue={product?.images[2]?.imageUrl}
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
      <Button fullWidth> Update</Button>
    </form>
  );
};

export default UpdateProduct;
