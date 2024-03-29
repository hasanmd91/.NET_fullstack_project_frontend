import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  Review,
  newProduct,
  newReview,
  product,
  updatedProduct,
} from '../../types/product';
import { getToken } from '../../utils/tokenUtils';
import { toast } from 'react-toastify';

/*GET ALL PRODUCT THUNK*/

export const getAllProductsAsync = createAsyncThunk<
  product[],
  undefined,
  { rejectValue: string }
>('getAllProductsAsync', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<product[]>(
      `https://ecommershop.azurewebsites.net/api/product/`
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
  string,
  { rejectValue: string }
>('getAProductsAsync', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<product>(
      `https://ecommershop.azurewebsites.net/api/product/${id}`
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
  newProduct,
  { rejectValue: string }
>('createNewProductAsync', async (NewProduct, { rejectWithValue }) => {
  try {
    const storedToken = getToken();
    const response = await axios.post<product>(
      `https://ecommershop.azurewebsites.net/api/product/`,
      NewProduct,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    const createdProduct: product = response.data;
    return createdProduct;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(`Error creating product: ${err.message}`);
    return rejectWithValue(err.message);
  }
});

/* DELETE A PRODUCT THUNK  */

export const deleteProductAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('deleteProductAsync', async (id, { rejectWithValue }) => {
  try {
    const storedToken = getToken();
    await axios.delete(
      `https://ecommershop.azurewebsites.net/api/product/${id}`,
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

/*UPDATE PRODUCT REDUCER*/

export const updateProductAsync = createAsyncThunk<
  product,
  updatedProduct,
  { rejectValue: string }
>('updateProductAsync', async (updateProduct, { rejectWithValue }) => {
  try {
    const storedToken = getToken();

    const { id, updatedData } = updateProduct;
    const response = await axios.patch<product>(
      `https://ecommershop.azurewebsites.net/api/product/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
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
  string,
  { rejectValue: string }
>('getAllProductsByCategoryAsync', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<product[]>(
      `https://ecommershop.azurewebsites.net/api/product?CategoryId=${id}`
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
      `https://ecommershop.azurewebsites.net/api/product?Search=${searchQuery}`
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/* CREATE REVIEW THUNK */

export const createNewReviewAsync = createAsyncThunk<
  Review,
  newReview,
  { rejectValue: string }
>('createNewReviewAsync', async (newReviewData, { rejectWithValue }) => {
  try {
    const storedToken = getToken();
    const response = await axios.post<Review>(
      `https://ecommershop.azurewebsites.net/api/review/`,
      newReviewData,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    console.log(response);

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data as unknown as string);
  }
});

/* DELETE REVIEW THUNK */

export const deleteNewReviewAsync = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>('deleteNewReviewAsync', async (id, { rejectWithValue }) => {
  try {
    const storedToken = getToken();
    const response = await axios.delete<boolean>(
      `https://ecommershop.azurewebsites.net/api/review/${id}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data as unknown as string);
  }
});
