import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { registerUser, user, updateUserDataType } from '../../types/user';
import { userCredentials } from '../../types/auth';
import { getToken, saveToken } from '../../utils/tokenUtils';
import { order } from '../../types/Order';
import { response } from 'msw';

/* LOGIN USER THUNK USING LOGIN CREDENTIAL */

export const loginUserAsync = createAsyncThunk<
  user,
  userCredentials,
  { rejectValue: string }
>('loginUserAsync ', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.post<string>(
      'https://ecommershop.azurewebsites.net/api/auth/login',
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
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data as unknown as string);
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
      'https://ecommershop.azurewebsites.net/api/auth/profile',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return userProfile.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data as unknown as string);
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
      'https://ecommershop.azurewebsites.net/api/user/',
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
    return rejectWithValue(err.response?.data as unknown as string);
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
      'https://ecommershop.azurewebsites.net/api/user/',
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
    return rejectWithValue(err.response?.data as unknown as string);
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
      const storedToken = getToken();

      const response = await axios.patch<user>(
        `https://ecommershop.azurewebsites.net/api/user/${id}`,
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
      return rejectWithValue(err.response?.data as unknown as string);
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
      `https://ecommershop.azurewebsites.net/api/user/${userid}`,
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

/* DELETE A USER THUNK*/

export const deleteAUserAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('deleteAUserAsync', async (userid, { rejectWithValue }) => {
  try {
    const storedToken = getToken();

    await axios.delete(
      `https://ecommershop.azurewebsites.net/api/user/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    return userid;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/* CREATE ADMIN  THUNK*/

export const changeUserRoleAsync = createAsyncThunk<
  user,
  string,
  { rejectValue: string }
>('changeUserRoleAsync', async (userid, { rejectWithValue }) => {
  try {
    const storedToken = getToken();
    const response = await axios.patch(
      `https://ecommershop.azurewebsites.net/api/user/changeuserrole/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const user: user = response.data;
    return user;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data as unknown as string);
  }
});

/*GET A ORDER THUNK*/

export const cancelAOrderAsync = createAsyncThunk<
  order,
  string,
  { rejectValue: string }
>('cancelAOrderAsync', async (id, { rejectWithValue }) => {
  try {
    const storedToken = getToken();

    const response = await axios.patch<order>(
      `https://ecommershop.azurewebsites.net/api/order/${id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    const order: order = response.data;
    return order;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.data as unknown as string);
  }
});
