import { createSlice } from '@reduxjs/toolkit';
import { product } from '../../types/product';
import { AxiosError } from 'axios';
import {
  createNewProductAsync,
  deleteProductAsync,
  getAllProductsAsync,
  updateProductAsync,
} from '../methods/productMethod';

type InitialStateType = {
  products: product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: InitialStateType = {
  products: [],
  status: 'loading',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllProductsAsync.pending, (state, action) => {
      state.status = 'loading';
    });

    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        state.status = 'succeeded';
        state.products = action.payload;
      }
    });

    builder.addCase(getAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.status = 'failed';
        state.error = action.payload.message;
      }
    });

    builder.addCase(createNewProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        state.status = 'succeeded';
        state.products = [...state.products, action.payload];
      }
    });

    builder.addCase(createNewProductAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.status = 'failed';
        state.error = action.payload.message;
      }
    });

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });

    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      }
    });

    builder.addCase(updateProductAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });
  },
});

export const {} = productSlice.actions;
const productReducer = productSlice.reducer;

export default productReducer;
