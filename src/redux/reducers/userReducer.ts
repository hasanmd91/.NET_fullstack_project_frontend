import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { user } from '../../types/user';
import {
  createNewUserAsync,
  getAUsersAsync,
  getAllUsersAsync,
  updateUserAsync,
} from '../methods/userMethod';
import { AxiosError } from 'axios';

type InitialStateType = {
  users: user[];
  currentUser?: user;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: InitialStateType = {
  users: [],
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    /*GET ALL USER REDUCER*/

    builder.addCase(
      getAllUsersAsync.pending,
      (state, action: PayloadAction<void>) => {
        state.status = 'loading';
      }
    );

    builder.addCase(
      getAllUsersAsync.fulfilled,
      (state, action: PayloadAction<user[] | AxiosError>) => {
        if (!(action.payload instanceof AxiosError)) {
          state.status = 'succeeded';
          state.users = action.payload;
        }
      }
    );

    builder.addCase(getAllUsersAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.status = 'failed';
        state.error = action.payload.message;
      }
    });

    /*GET A USER REDUCER*/

    builder.addCase(
      getAUsersAsync.pending,
      (state, action: PayloadAction<void>) => {
        state.status = 'loading';
      }
    );

    builder.addCase(
      getAUsersAsync.fulfilled,
      (state, action: PayloadAction<user | AxiosError>) => {
        if (!(action.payload instanceof AxiosError)) {
          state.status = 'succeeded';
          state.currentUser = action.payload;
        }
      }
    );

    builder.addCase(getAUsersAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.status = 'failed';
        state.error = action.payload.message;
      }
    });

    /*CREATE A USER REDUCER*/

    builder.addCase(createNewUserAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        state.status = 'succeeded';
        state.users = [...state.users, action.payload];
        state.currentUser = action.payload;
      }
    });

    /*UPDATE USER REDUCER*/

    builder.addCase(
      updateUserAsync.fulfilled,
      (state, action: PayloadAction<user | AxiosError>) => {
        if (
          Array.isArray(state.users) &&
          !(action.payload instanceof AxiosError)
        ) {
          const updatedUser = action.payload;
          state.users = state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
        }
      }
    );

    builder.addCase(updateUserAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message;
      }
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
