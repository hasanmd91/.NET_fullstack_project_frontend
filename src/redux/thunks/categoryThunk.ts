import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { category, newCategory, updatedCategory } from '../../types/category';

export const getAllCategoryAsync = createAsyncThunk<
  category[],
  undefined,
  { rejectValue: string }
>('getAllCategoryAsync', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<category[]>(
      'https://api.escuelajs.co/api/v1/categories'
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

export const createCategoryAsync = createAsyncThunk<
  category,
  newCategory,
  { rejectValue: string }
>(
  'createCategoryAsync',
  async (newCategory: newCategory, { rejectWithValue }) => {
    try {
      const response = await axios.post<category>(
        'https://api.escuelajs.co/api/v1/categories',
        newCategory
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('deleteCategoryAsync', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete<boolean>(
      `https://api.escuelajs.co/api/v1/categories/${id}`
    );
    if (!response.data) {
      throw new Error('Unable to delete category');
    } else {
      return id;
    }
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

export const updateCategoryAsync = createAsyncThunk<
  category,
  updatedCategory,
  { rejectValue: string }
>('updateCategoryAsync', async (categoryData, { rejectWithValue }) => {
  const { id, updatedData } = categoryData;
  try {
    const response = await axios.put<category>(
      `https://api.escuelajs.co/api/v1/categories/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
