import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axiosInstance from '../../shared/axiosInstance';
import { category, newCategory } from '../../types/category';

export const getAllCategoryAsync = createAsyncThunk(
  'getAllCategoryAsync',
  async () => {
    try {
      const response = await axiosInstance.get<category[]>('categories');
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

export const createCategoryAsync = createAsyncThunk(
  'createCategoryAsync',
  async (newCategory: newCategory) => {
    try {
      const response = await axiosInstance.post<category>(
        'categories',
        newCategory
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'deleteCategoryAsync',
  async (id: number) => {
    try {
      const response = await axiosInstance.post<boolean>(`categories/${id}`);
      if (!response.data) {
        throw new Error('Unable to delete category');
      } else {
        return id;
      }
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'updateCategoryAsync',
  async (categoryData: category) => {
    const { id } = categoryData;
    try {
      const response = await axiosInstance.put<category>(
        `categories/${id}`,
        categoryData
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);
