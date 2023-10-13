import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import axiosInstance from '../../shared/axiosInstance';
import { newProduct, product, updatedProduct } from '../../types/product';
import BASE_URL from '../../shared/BASE_URL';

export const getAllProductsAsync = createAsyncThunk(
  'getAllProductsAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<product[]>(`${BASE_URL}/products`);
      const products: product[] = response.data;
      return products;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err);
    }
  }
);

export const getAProductsAsync = createAsyncThunk(
  'getAProductsAsync',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<product>(`${BASE_URL}/products/${id}`);
      const product: product = response.data;
      return product;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err);
    }
  }
);

export const createNewProductAsync = createAsyncThunk(
  'createNewProductAsync',
  async (newProduct: newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post<product>(
        `${BASE_URL}/products`,
        newProduct
      );
      const createdProduct: product = response.data;
      return createdProduct;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'deleteProductAsync',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete<boolean>(
        `${BASE_URL}/products/${id}`
      );
      if (!response.data) {
        throw new Error('Unable to Delete Product');
      } else {
        return id;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'updateProductAsync',
  async (updateProduct: updatedProduct, { rejectWithValue }) => {
    try {
      const { id, updatedData } = updateProduct;
      const response = await axiosInstance.put<product>(
        `/products/${id}`,
        updatedData
      );
      const updateNewProduct: product = response.data;
      return updateNewProduct;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err);
    }
  }
);

/* GET ALL PRODUCTS BY CATEGORY */

export const getAllProductsByCategoryAsync = createAsyncThunk(
  'getAllProductsByCategoryAsync',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<product[]>(
        `categories/${id}/products`
      );
      const products: product[] = response.data;
      return products;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err);
    }
  }
);
