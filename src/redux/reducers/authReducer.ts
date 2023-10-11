import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { user } from '../../types/user';
import { getLogedUserAsync, loginAsync } from '../methods/authMethod';

type InitialStateType = {
  loggedIn: boolean;
  currentUser: user | null;
  error?: boolean;
  errorMsg?: string;
};

const initialState: InitialStateType = {
  loggedIn: false,
  currentUser: null,
  error: false,
  errorMsg: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('accessToken');
      state.loggedIn = false;
      state.currentUser = null;
      state.error = false;
      state.errorMsg = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginAsync.fulfilled,
      (state, action: PayloadAction<user | undefined>) => {
        if (
          !(action.payload instanceof AxiosError) &&
          action.payload &&
          !('message' in action.payload)
        ) {
          state.loggedIn = true;
          state.currentUser = action.payload;
          state.error = false;
          state.errorMsg = '';
        }
      }
    );

    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loggedIn = false;
      state.currentUser = null;
      state.error = true;
      state.errorMsg = action.payload as string;
    });

    builder.addCase(
      getLogedUserAsync.fulfilled,
      (state, action: PayloadAction<user>) => {
        if (
          !(action.payload instanceof AxiosError) &&
          action.payload &&
          !('message' in action.payload)
        ) {
          state.loggedIn = true;
          state.currentUser = action.payload;
          state.error = false;
          state.errorMsg = '';
        }
      }
    );
  },
});

const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions;
export default authReducer;
