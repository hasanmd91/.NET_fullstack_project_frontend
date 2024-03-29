import { createSlice } from '@reduxjs/toolkit';
import { order } from '../../types/Order';
import {
  createNewOrderAsync,
  deleteOrderAsync,
  getAOrdersAsync,
  getAllOrdersAsync,
  updateOrderAsync,
} from '../thunks/OrederThunk';

export type orderStateType = {
  orders: order[];
  order?: order;
  loading: boolean;
  error?: string;
};

const initialState: orderStateType = {
  orders: [],
  loading: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    /*GET ALL ORDER REDUCER*/
    builder.addCase(getAllOrdersAsync.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(getAllOrdersAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(getAllOrdersAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /*GET A ORDER REDUCER*/
    builder.addCase(getAOrdersAsync.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(getAOrdersAsync.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(getAOrdersAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /*GET A ORDER REDUCER*/
    builder.addCase(createNewOrderAsync.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(createNewOrderAsync.fulfilled, (state, action) => {
      state.orders = [action.payload, ...state.orders];
      state.loading = false;
      state.error = '';
    });

    builder.addCase(createNewOrderAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /*UPDATE ORDER REDUCER*/

    builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
      const updatedOrder = action.payload;
      state.orders = state.orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      );
      state.loading = false;
      state.error = '';
    });

    builder.addCase(updateOrderAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /*DELETE A ORDER REDUCER*/

    builder.addCase(deleteOrderAsync.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
      state.loading = false;
      state.error = '';
    });

    builder.addCase(deleteOrderAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const orderReducer = orderSlice.reducer;
export default orderReducer;
