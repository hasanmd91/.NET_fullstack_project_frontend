import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { category, newCategory, updatedCategory } from '../../types/category';
import { getToken } from '../../utils/tokenUtils';

export const getAllCategoryAsync = createAsyncThunk<
  category[],
  undefined,
  { rejectValue: string }
>('getAllCategoryAsync', async (_, { rejectWithValue }) => {
  try {
    const storedToken = getToken();

    const response = await axios.get<category[]>(
      'https://ecommershop.azurewebsites.net/api/category/',
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
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
      const storedToken = getToken();

      const response = await axios.post<category>(
        'https://ecommershop.azurewebsites.net/api/category/',
        newCategory,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('deleteCategoryAsync', async (id, { rejectWithValue }) => {
  try {
    const storedToken = getToken();
    await axios.delete(
      `https://ecommershop.azurewebsites.net/api/category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    return id;
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
  const { id, name } = categoryData;

  try {
    const storedToken = getToken();

    const response = await axios.patch<category>(
      `https://ecommershop.azurewebsites.net/api/category/${id}`,
      { name: name },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
