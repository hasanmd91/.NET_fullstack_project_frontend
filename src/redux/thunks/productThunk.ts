import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { NewProduct, product, UpdatedProduct } from '../../types/product';

/*GET ALL PRODUCT THUNK*/

export const getAllProductsAsync = createAsyncThunk<
  product[],
  undefined,
  { rejectValue: string }
>('getAllProductsAsync', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<product[]>(
      `https://api.escuelajs.co/api/v1/products`
    );
    const products: product[] = response.data;
    return products;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/*GET A PRODUCT THUNK*/

export const getAProductsAsync = createAsyncThunk<
  product,
  number,
  { rejectValue: string }
>('getAProductsAsync', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<product>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    const product: product = response.data;
    return product;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/*   CREATE NEW PRODUCT THUNK    */

export const createNewProductAsync = createAsyncThunk<
  product,
  NewProduct,
  { rejectValue: string }
>('createNewProductAsync', async (NewProduct, { rejectWithValue }) => {
  try {
    const response = await axios.post<product>(
      `https://api.escuelajs.co/api/v1/products`,
      NewProduct
    );
    const createdProduct: product = response.data;
    return createdProduct;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/* DELETE A PRODUCT THUNK  */

export const deleteProductAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('deleteProductAsync', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete<boolean>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    if (!response.data) {
      throw new Error('Unable to Delete Product');
    } else {
      return id;
    }
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/*UPDATE PRODUCT REDUCER*/

export const updateProductAsync = createAsyncThunk<
  product,
  UpdatedProduct,
  { rejectValue: string }
>('updateProductAsync', async (updateProduct, { rejectWithValue }) => {
  try {
    const { id, updatedData } = updateProduct;
    const response = await axios.put<product>(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      updatedData
    );
    const updateNewProduct: product = response.data;

    return updateNewProduct;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/* GET ALL PRODUCTS BY CATEGORY */

export const getAllProductsByCategoryAsync = createAsyncThunk<
  product[],
  number,
  { rejectValue: string }
>('getAllProductsByCategoryAsync', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<product[]>(
      `https://api.escuelajs.co/api/v1/categories/${id}/products`
    );
    const products: product[] = response.data;
    return products;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/* SEARCH PRODUCTS BY TITLE */

export const getProductByTitleAsync = createAsyncThunk<
  product[],
  string,
  { rejectValue: string }
>('getProductByTitleAsync', async (searchQuery, { rejectWithValue }) => {
  try {
    const response = await axios.get<product[]>(
      `https://api.escuelajs.co/api/v1/products/?title=${searchQuery}`
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
