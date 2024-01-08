import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getToken } from '../../utils/tokenUtils';
import { newOrder, order, updateOrder } from '../../types/Order';

/*GET ALL ORDER THUNK*/

export const getAllOrdersAsync = createAsyncThunk<
  order[],
  undefined,
  { rejectValue: string }
>('getAllOrdersAsync', async (_, { rejectWithValue }) => {
  try {
    const storedToken = getToken();

    const response = await axios.get<order[]>(
      `https://ecommershop.azurewebsites.net/api/order/`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const Orders: order[] = response.data;
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
    const storedToken = getToken();

    const response = await axios.get<order>(
      `https://ecommershop.azurewebsites.net/api/order/${id}`,
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
      `https://ecommershop.azurewebsites.net/api/order/`,
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

/*   UPDATE A ORDER THUNK    */

export const updateOrderAsync = createAsyncThunk<
  order,
  updateOrder,
  { rejectValue: string }
>('updateOrderAsync', async (updateOrder, { rejectWithValue }) => {
  const { id, orderStatus } = updateOrder;

  try {
    const storedToken = getToken();
    const response = await axios.patch<order>(
      `https://ecommershop.azurewebsites.net/api/order/${id}`,
      { orderStatus },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const updatedOrder: order = response.data;
    return updatedOrder;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

/* DELETE A ORDER THUNK  */

export const deleteOrderAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('deleteOrderAsync', async (orderId, { rejectWithValue }) => {
  try {
    const storedToken = getToken();
    await axios.delete<order>(
      `https://ecommershop.azurewebsites.net/api/order/${orderId}`,

      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return orderId;
  } catch (error) {
    const err = error as AxiosError;

    console.log(err);

    return rejectWithValue(err.response?.data as unknown as string);
  }
});
