import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { user } from '../../types/user';
import {
  createNewUserAsync,
  getAUsersAsync,
  getAllUsersAsync,
  updateUserAsync,
} from '../methods/userMethod';

type userStateType = {
  users: user[];
  currentUser?: user;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: userStateType = {
  users: [],
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    /* GET ALL USER REDUCER */

    builder.addCase(
      getAllUsersAsync.pending,
      (state, action: PayloadAction<void>) => {
        state.status = 'loading';
      }
    );

    builder.addCase(
      getAllUsersAsync.fulfilled,
      (state, action: PayloadAction<user[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      }
    );

    builder.addCase(getAllUsersAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    /* GET A USER REDUCER */

    builder.addCase(
      getAUsersAsync.pending,
      (state, action: PayloadAction<void>) => {
        state.status = 'loading';
      }
    );

    builder.addCase(
      getAUsersAsync.fulfilled,
      (state, action: PayloadAction<user>) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      }
    );

    builder.addCase(getAUsersAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    /* CREATE A USER REDUCER */

    builder.addCase(createNewUserAsync.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users = [...state.users, action.payload];
      state.currentUser = action.payload;
    });

    /* UPDATE USER REDUCER */

    builder.addCase(
      updateUserAsync.fulfilled,
      (state, action: PayloadAction<user>) => {
        if (Array.isArray(state.users)) {
          const updatedUser = action.payload;
          state.users = state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
        }
      }
    );

    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
