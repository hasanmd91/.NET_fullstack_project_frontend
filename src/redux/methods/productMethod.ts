import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axiosInstance from '../../shared/axiosInstance';
import { newProduct, product, updatedProduct } from '../../types/product';

export const getAllProductsAsync = createAsyncThunk(
  'getAllProductsAsync',
  async () => {
    try {
      const response = await axiosInstance.get<product[]>('products');
      const products: product[] = response.data;
      return products;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

export const getAProductsAsync = createAsyncThunk(
  'getAProductsAsync',
  async (id: number) => {
    try {
      const response = await axiosInstance.get<product>(`products/${id}`);
      const products: product = response.data;
      return products;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

export const createNewProductAsync = createAsyncThunk(
  'createNewProductAsync',
  async (newProduct: newProduct) => {
    try {
      const response = await axiosInstance.post<product>(
        '/products/',
        newProduct
      );
      const createdProduct: product = response.data;
      return createdProduct;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'deleteProductAsync',
  async (productId: number) => {
    try {
      const response = await axiosInstance.delete<boolean>(
        `products/${productId}`
      );
      if (!response.data) {
        throw new Error('Unable to Delete Product');
      } else {
        return productId;
      }
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'updateProductAsync',
  async (updateProduct: updatedProduct) => {
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
      return err;
    }
  }
);

/* GET ALL PRODUCTS BY CATEGORY */

export const getAllProductsByCategoryAsync = createAsyncThunk(
  'getAllProductsByCategoryAsync',
  async (id: number) => {
    try {
      const response = await axiosInstance.get<product[]>(
        `categories/${id}/products`
      );
      const products: product[] = response.data;
      return products;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);
