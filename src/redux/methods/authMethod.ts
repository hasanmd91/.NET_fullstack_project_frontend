import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../shared/axiosInstance';
import { LoginResponse, userCredentials } from '../../types/auth';
import { user } from '../../types/user';
import { AxiosError } from 'axios';

export const loginAsync = createAsyncThunk(
  'loginAsync',
  async (credentials: userCredentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
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

const loginUser = async (credentials: userCredentials) => {
  return axiosInstance.post<LoginResponse>('auth/login', credentials);
};

const saveAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

const fetchUserProfile = async (accessToken: string) => {
  const response = await axiosInstance.get<user>('auth/profile', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
