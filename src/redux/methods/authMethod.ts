import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axiosInstance from '../../shared/axiosInstance';
import { LoginResponse, userCredentials } from '../../types/auth';
import { user } from '../../types/user';
import saveAccessToken from '../../utils/SaveAccessToken';
import fetchUserProfile from '../../utils/fetchUserProfile';

export const loginAsync = createAsyncThunk(
  'loginAsync',
  async (credentials: userCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        'auth/login',
        credentials
      );
      const accessToken = response.data?.access_token;

      if (accessToken) {
        saveAccessToken(accessToken);
        const userProfile = await fetchUserProfile(accessToken);
        return userProfile;
      }
    } catch (error) {
      const err = error as AxiosError;
      const errorMsg: string =
        err.response?.status === 401
          ? 'Email or Password are incorrect'
          : 'Something went wrong, please try again';

      return rejectWithValue(errorMsg);
    }
  }
);

export const getLogedUserAsync = createAsyncThunk(
  'getLogedUserAsync',
  async (access_token: string, { rejectWithValue }) => {
    try {
      const userProfile: user = await fetchUserProfile(access_token);
      return userProfile;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);
