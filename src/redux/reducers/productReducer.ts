import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { product } from '../../types/product';
import {
  createNewProductAsync,
  createNewReviewAsync,
  deleteNewReviewAsync,
  deleteProductAsync,
  getAProductsAsync,
  getAllProductsAsync,
  getAllProductsByCategoryAsync,
  getProductByTitleAsync,
  updateProductAsync,
} from '../thunks/productThunk';

export type productStateType = {
  products: product[];
  product?: product;
  loading: boolean;
  error?: string;
};

const initialState: productStateType = {
  products: [],
  loading: false,
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

    builder.addCase(getAllProductsAsync.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(getAllProductsAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /*GET A PRODUCT REDUCER*/

    builder.addCase(getAProductsAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getAProductsAsync.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(getAProductsAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(createNewReviewAsync.fulfilled, (state, action) => {
      if (state.product) {
        state.product = {
          ...state.product,
          reviews: state.product.reviews
            ? [...state.product.reviews, action.payload]
            : [action.payload],
        };
      }
      state.loading = false;
      state.error = '';
    });

    /*CREATE NEW PRODUCT REDUCER*/

    builder.addCase(createNewProductAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createNewProductAsync.fulfilled, (state, action) => {
      state.products = [action.payload, ...state.products];
      state.loading = false;
      state.error = '';
    });

    builder.addCase(createNewProductAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /*DELETE A PRODUCT REDUCER*/

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.loading = false;
      state.error = '';
    });

    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /*UPDATE PRODUCT REDUCER*/

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const updatedProduct = action.payload;
      state.products = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      state.loading = false;
      state.error = '';
    });

    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /*GET ALL PRODUCT BY CATEGORY REDUCER*/

    builder.addCase(getAllProductsByCategoryAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      getAllProductsByCategoryAsync.fulfilled,
      (state, action) => {
        state.loading = false;
        state.products = action.payload;
      }
    );

    builder.addCase(getAllProductsByCategoryAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /*SEARCH ALL PRODUCT BY TITLE REDUCER*/

    builder.addCase(getProductByTitleAsync.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(getProductByTitleAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      const originalProducts = [...state.products];

      if (!action.payload.length) {
        state.products = originalProducts;
      } else {
        state.products = action.payload;
      }
    });

    builder.addCase(getProductByTitleAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { sortProduct } = productSlice.actions;
const productReducer = productSlice.reducer;

export default productReducer;
