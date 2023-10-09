import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { user } from '../../types/user';
import { loginAsync } from '../methods/authMethod';

type InitialStateType = {
  loggedIn: boolean;
  userInfo: user | null;
  error?: boolean;
  errorMsg?: string;
};

const initialState: InitialStateType = {
  loggedIn: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      console.log('i am logout get called ');

      localStorage.removeItem('accessToken');
      state.loggedIn = false;
      state.userInfo = null;
      state.error = false;
      state.errorMsg = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      if (
        !(action.payload instanceof AxiosError) &&
        action.payload &&
        !('message' in action.payload)
      ) {
        state.loggedIn = true;
        state.userInfo = action.payload;
        state.error = false;
        state.errorMsg = '';
      }
    });

    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loggedIn = false;
      state.userInfo = null;
      state.error = true;
      state.errorMsg = action.error.message;
    });
  },
});

const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions;
export default authReducer;
