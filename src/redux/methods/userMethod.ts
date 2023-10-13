import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { registerUser, user, updateUserDataType } from '../../types/user';

/* GET ALL USER METHOD*/

export const getAllUsersAsync = createAsyncThunk(
  'getAllUsersAsync',
  async () => {
    try {
      const response = await axios.get<user[]>(
        'https://api.escuelajs.co/api/v1/users'
      );
      const users: user[] = response.data;
      return users;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

/* GET A SINGLE USER METHOD*/

export const getAUsersAsync = createAsyncThunk(
  'getAUsersAsync',
  async (userId: number) => {
    try {
      const response = await axios.get<user>(
        `https://api.escuelajs.co/api/v1/users/${userId}`
      );
      const users: user = response.data;
      return users;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);

/* CREATE A USER METHOD*/

export const createNewUserAsync = createAsyncThunk(
  'createNewUserAsync',
  async (newUser: registerUser, { rejectWithValue }) => {
    try {
      const response = await axios.post<user>(
        'https://api.escuelajs.co/api/v1/users',
        newUser
      );
      const newCreatedUser: user = response.data;
      return newCreatedUser;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err);
    }
  }
);

/* UPDATE A USER METHOD*/

export const updateUserAsync = createAsyncThunk(
  'updateUserAsync',
  async ({ data, id }: updateUserDataType) => {
    try {
      const response = await axios.put<user>(
        `https://api.escuelajs.co/api/v1/users/${id}`,
        data
      );
      const updatedUser: user = response.data;
      return updatedUser;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }
);
