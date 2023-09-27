import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { category } from '../../types/category';
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getAllCategoryAsync,
  updateCategoryAsync,
} from '../methods/categoryMethod';
import { AxiosError } from 'axios';

type InitialStateType = {
  categories: category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: InitialStateType = {
  categories: [],
  status: 'idle',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*GET ALL CATEGORY REDUCER*/

    builder.addCase(
      getAllCategoryAsync.pending,
      (state, action: PayloadAction<void>) => {
        state.status = 'loading';
      }
    );

    builder.addCase(
      getAllCategoryAsync.fulfilled,
      (state, action: PayloadAction<category[] | AxiosError>) => {
        if (!(action.payload instanceof AxiosError)) {
          state.status = 'succeeded';
          state.categories = action.payload;
        }
      }
    );

    builder.addCase(getAllCategoryAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.status = 'failed';
        state.error = action.payload.message;
      }
    });

    /*CREATE NEW CATEGORY REDUCER*/

    builder.addCase(
      createCategoryAsync.fulfilled,
      (state, action: PayloadAction<category | AxiosError>) => {
        if (!(action.payload instanceof AxiosError)) {
          state.status = 'succeeded';
          state.categories = [...state.categories, action.payload];
        }
      }
    );

    builder.addCase(createCategoryAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.status = 'failed';
        state.error = action.payload.message;
      }
    });

    /*DELETE CATEGORY REDUCER*/

    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError || Error)) {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      }
    });

    builder.addCase(deleteCategoryAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });

    /*UPDATE CATEGORY REDUCER*/

    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        const updatedCategory = action.payload;
        state.categories = state.categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        );
      }
    });

    builder.addCase(updateCategoryAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });
  },
});

const categoryReducer = categorySlice.reducer;
export const {} = categorySlice.actions;
export default categoryReducer;
