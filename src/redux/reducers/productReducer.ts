import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { product } from '../../types/product';
import {
  createNewProductAsync,
  deleteProductAsync,
  getAProductsAsync,
  getAllProductsAsync,
  getAllProductsByCategoryAsync,
  updateProductAsync,
} from '../thunks/productThunk';

export type productStateType = {
  products: product[];
  product?: product;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: productStateType = {
  products: [],
  status: 'loading',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    sortProduct: (state, action: PayloadAction<string>) => {
      if (action.payload === 'LOW_TO_HIGH_PRICE') {
        state.products = state.products.sort((a, b) =>
          a.price > b.price ? 1 : -1
        );
      }
      if (action.payload === 'HIGH_TO_LOW_PRICE') {
        state.products = state.products.sort((a, b) =>
          a.price > b.price ? -1 : 1
        );
      }
      if (action.payload === 'A-Z') {
        state.products = state.products.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
      }
      if (action.payload === 'Z-A') {
        state.products = state.products.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
        );
      }
    },
  },

  extraReducers: (builder) => {
    /*GET ALL PRODUCT REDUCER*/

    builder.addCase(
      getAllProductsAsync.pending,
      (state, action: PayloadAction<void>) => {
        state.status = 'loading';
      }
    );

    builder.addCase(
      getAllProductsAsync.fulfilled,
      (state, action: PayloadAction<product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      }
    );

    builder.addCase(getAllProductsAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    /*GET A PRODUCT REDUCER*/

    builder.addCase(
      getAProductsAsync.pending,
      (state, action: PayloadAction<void>) => {
        state.status = 'loading';
      }
    );

    builder.addCase(
      getAProductsAsync.fulfilled,
      (state, action: PayloadAction<product>) => {
        state.status = 'succeeded';
        state.product = action.payload;
      }
    );

    builder.addCase(getAProductsAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    /*CREATE NEW PRODUCT REDUCER*/

    builder.addCase(
      createNewProductAsync.fulfilled,
      (state, action: PayloadAction<product>) => {
        state.status = 'succeeded';
        state.products = [...state.products, action.payload];
      }
    );

    builder.addCase(createNewProductAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    /*DELETE A PRODUCT REDUCER*/

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });

    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    /*UPDATE PRODUCT REDUCER*/

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const updatedProduct = action.payload;
      state.products = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
    });

    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    /*GET ALL PRODUCT BY CATEGORY REDUCER*/

    builder.addCase(
      getAllProductsByCategoryAsync.pending,
      (state, action: PayloadAction<void>) => {
        state.status = 'loading';
      }
    );

    builder.addCase(
      getAllProductsByCategoryAsync.fulfilled,
      (state, action: PayloadAction<product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      }
    );

    builder.addCase(getAllProductsByCategoryAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export const { sortProduct } = productSlice.actions;
const productReducer = productSlice.reducer;

export default productReducer;
