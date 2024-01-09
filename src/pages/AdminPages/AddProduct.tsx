import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newProduct } from '../../types/product';
import { productSchema } from '../../validation/productSchema';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { category } from '../../types/category';
import { getAllCategoryAsync } from '../../redux/thunks/categoryThunk';
import { product } from '../../types/product';
import {
  createNewProductAsync,
  updateProductAsync,
} from '../../redux/thunks/productThunk';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

interface UpdateProductProps {
  rowData?: product;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct: React.FC<UpdateProductProps> = ({
  rowData,
  setIsModalOpen,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategoryAsync());
  }, [dispatch]);

  const submitHandeler: SubmitHandler<newProduct> = (data: newProduct) => {
    if (rowData) {
      dispatch(updateProductAsync({ id: rowData?.id, updatedData: data }));
      setIsModalOpen(false);
    } else {
      dispatch(createNewProductAsync(data));
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandeler)}>
      <Controller
        name="title"
        defaultValue={rowData ? rowData.title : ''}
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
        defaultValue={rowData ? rowData.description : ''}
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
        defaultValue={rowData ? rowData.price : undefined}
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
        defaultValue={rowData ? rowData.quantity : undefined}
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
          defaultValue={rowData ? rowData.categoryId : ''}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="categoryId-label"
              label="Category"
              error={!!errors.categoryId}
            >
              {categories?.map((category: category) => (
                <MenuItem key={category?.id} value={category?.id}>
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
        defaultValue={rowData ? rowData.images[0]?.imageUrl : ''}
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
        defaultValue={rowData ? rowData.images[1]?.imageUrl : ''}
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
        defaultValue={rowData ? rowData.images[2]?.imageUrl : ''}
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
      <Button fullWidth>{rowData ? 'Update' : 'Add new product'}</Button>
      <Button type="button" fullWidth onClick={() => setIsModalOpen(false)}>
        Cancle
      </Button>
    </form>
  );
};

export default AddProduct;
