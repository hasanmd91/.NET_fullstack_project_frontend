import { createSlice } from '@reduxjs/toolkit';
import { category } from '../../types/category';
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getAllCategoryAsync,
  updateCategoryAsync,
} from '../thunks/categoryThunk';

type categoryStateType = {
  categories: category[];
  loading: boolean;
  error?: string;
};

const initialState: categoryStateType = {
  categories: [],
  loading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*GET ALL CATEGORY REDUCER*/

    builder.addCase(getAllCategoryAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getAllCategoryAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllCategoryAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /*CREATE NEW CATEGORY REDUCER*/

    builder.addCase(createCategoryAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createCategoryAsync.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
      state.loading = false;
    });

    builder.addCase(createCategoryAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    /*DELETE CATEGORY REDUCER*/

    builder.addCase(deleteCategoryAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
      state.loading = false;
    });

    builder.addCase(deleteCategoryAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /*UPDATE CATEGORY REDUCER*/

    builder.addCase(updateCategoryAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      const updatedCategory = action.payload;
      state.categories = state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );

      state.loading = false;
    });

    builder.addCase(updateCategoryAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
