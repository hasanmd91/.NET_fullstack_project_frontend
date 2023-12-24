import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { catgorySchema } from '../validation/productSchema';
import { newCategory } from '../types/category';
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getAllCategoryAsync,
} from '../redux/thunks/categoryThunk';
import useAppDispatch from '../hooks/useAppDispatch';
import TextField from '../components/TextField/TextField';
import Button from '../components/Button/Button';
import { category, updatedCategory } from './../types/category';
import useAppSelector from '../hooks/useAppSelector';
import { Box, Paper } from '@mui/material';
import CategoryList from './CategoryList';

const AddCategory = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.category
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<newCategory>({
    resolver: yupResolver(catgorySchema),
  });

  const dispatch = useAppDispatch();

  const submitHandeler: SubmitHandler<newCategory> = (data: newCategory) => {
    dispatch(createCategoryAsync(data));
  };

  useEffect(() => {
    dispatch(getAllCategoryAsync());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandeler)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Category Name"
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Button>Add Category</Button>
      </form>
      <CategoryList />
    </div>
  );
};

export default AddCategory;
