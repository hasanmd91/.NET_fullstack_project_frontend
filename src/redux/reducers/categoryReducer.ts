import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { category } from '../../types/category';
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getAllCategoryAsync,
  updateCategoryAsync,
} from '../thunks/categoryThunk';

type categoryStateType = {
  categories: category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: categoryStateType = {
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
      (state, action: PayloadAction<category[]>) => {
        if (state.status !== 'failed') {
          state.status = 'succeeded';
          state.categories = action.payload;
        }
      }
    );

    builder.addCase(getAllCategoryAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    /*CREATE NEW CATEGORY REDUCER*/

    builder.addCase(
      createCategoryAsync.fulfilled,
      (state, action: PayloadAction<category>) => {
        if (state.status !== 'failed') {
          state.status = 'succeeded';
          state.categories = [...state.categories, action.payload];
        }
      }
    );

    builder.addCase(createCategoryAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    /*DELETE CATEGORY REDUCER*/

    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      if (state.status !== 'failed') {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      }
    });

    builder.addCase(deleteCategoryAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    /*UPDATE CATEGORY REDUCER*/

    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      if (state.status !== 'failed') {
        const updatedCategory = action.payload;
        state.categories = state.categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        );
      }
    });

    builder.addCase(updateCategoryAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
