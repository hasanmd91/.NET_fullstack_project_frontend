import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getToken } from '../../utils/tokenUtils';
import { newOrder, order } from '../../types/Order';

/*GET ALL ORDER THUNK*/

export const getAllOrdersAsync = createAsyncThunk<
  order[],
  undefined,
  { rejectValue: string }
>('getAllOrdersAsync', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<order[]>(
      `http://localhost:5137/api/order/`
    );
    const Orders: order[] = response.data;
    console.log(Orders);
    return Orders;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/*GET A ORDER THUNK*/

export const getAOrdersAsync = createAsyncThunk<
  order,
  string,
  { rejectValue: string }
>('getAOrdersAsync', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<order>(
      `http://localhost:5137/api/order/${id}`
    );
    const order: order = response.data;
    return order;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/*   CREATE NEW ORDER THUNK    */

export const createNewOrderAsync = createAsyncThunk<
  order,
  newOrder,
  { rejectValue: string }
>('createNewOrderAsync', async (NewOrder, { rejectWithValue }) => {
  try {
    const storedToken = getToken();
    const response = await axios.post<order>(
      `http://localhost:5137/api/order/`,
      NewOrder,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    const createdOrder: order = response.data;
    return createdOrder;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
