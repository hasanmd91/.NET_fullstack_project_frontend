import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { registerUser, user, updateUserDataType } from '../../types/user';
import { LoginResponse, userCredentials } from '../../types/auth';

/* LOGIN USER THUNK USING LOGIN CREDENTIAL */

export const loginUserAsync = createAsyncThunk<
  user,
  userCredentials,
  { rejectValue: string }
>('loginUserAsync ', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      'https://api.escuelajs.co/api/v1/auth/login',
      credentials
    );
    const { access_token } = response.data;
    const authenticatedResult = await dispatch(
      authenticateUserAsync(access_token)
    );

    if (
      typeof authenticatedResult.payload === 'string' ||
      !authenticatedResult.payload
    ) {
      throw Error(authenticatedResult.payload || 'Cannot login');
    }
    return authenticatedResult.payload as user;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});

/* LOGIN USER THUNK USING ACCESS TOKEN */

export const authenticateUserAsync = createAsyncThunk<
  user,
  string,
  { rejectValue: string }
>('authenticateUserAsync ', async (access_token, { rejectWithValue }) => {
  try {
    const userProfile = await axios.get(
      'https://api.escuelajs.co/api/v1/auth/profile',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return userProfile.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/* GET ALL USER THUNK*/

export const getAllUsersAsync = createAsyncThunk<
  user[],
  undefined,
  { rejectValue: string }
>('getAllUsersAsync', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<user[]>(
      'https://api.escuelajs.co/api/v1/users'
    );
    const users: user[] = response.data;
    return users;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/* CREATE A USER THUNK*/

export const createNewUserAsync = createAsyncThunk<
  user,
  registerUser,
  { rejectValue: string }
>('createNewUserAsync', async (newUser: registerUser, { rejectWithValue }) => {
  try {
    const response = await axios.post<user>(
      'https://api.escuelajs.co/api/v1/users',
      newUser
    );
    const newCreatedUser: user = response.data;
    return newCreatedUser;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/* UPDATE A USER THUNK*/

export const updateUserAsync = createAsyncThunk<
  user,
  updateUserDataType,
  { rejectValue: string }
>(
  'updateUserAsync',
  async ({ data, id }: updateUserDataType, { rejectWithValue }) => {
    try {
      const response = await axios.put<user>(
        `https://api.escuelajs.co/api/v1/users/${id}`,
        data
      );
      const updatedUser: user = response.data;
      return updatedUser;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);
