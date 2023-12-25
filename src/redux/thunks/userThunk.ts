import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { registerUser, user, updateUserDataType } from '../../types/user';
import { userCredentials } from '../../types/auth';
import { getToken, saveToken } from '../../utils/tokenUtils';

/* LOGIN USER THUNK USING LOGIN CREDENTIAL */

export const loginUserAsync = createAsyncThunk<
  user,
  userCredentials,
  { rejectValue: string }
>('loginUserAsync ', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.post<string>(
      'http://localhost:5137/api/auth/login',
      credentials
    );
    const { data: access_token } = response;

    saveToken(access_token);

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
      'http://localhost:5137/api/auth/profile',
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
    const storedToken = getToken();
    const response = await axios.get<user[]>(
      'http://localhost:5137/api/user/',
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
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
>('createNewUserAsync', async (newUser, { rejectWithValue }) => {
  try {
    const storedToken = getToken();

    const response = await axios.post<user>(
      'http://localhost:5137/api/user/',
      newUser,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
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
      console.log(data, id);

      const storedToken = getToken();

      const response = await axios.patch<user>(
        `http://localhost:5137/api/user/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const updatedUser: user = response.data;
      return updatedUser;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);

/* GET A USER THUNK*/

export const getAUserAsync = createAsyncThunk<
  user,
  string,
  { rejectValue: string }
>('getAUserAsync', async (userid, { rejectWithValue }) => {
  try {
    const storedToken = getToken();

    const response = await axios.get<user>(
      `http://localhost:5137/api/user/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    const user: user = response.data;
    return user;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
