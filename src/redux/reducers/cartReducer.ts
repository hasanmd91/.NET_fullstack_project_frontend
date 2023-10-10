import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cart';
import { stat } from 'fs';

type InitialStateType = {
  cartItems: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
};

const initialState: InitialStateType = {
  cartItems: [],
  status: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const Item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (Item) {
        Item.quantity++;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },

    setItemQuantity: (
      state,
      action: PayloadAction<{ quantity: number; id: number }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addItemToCart, removeItemFromCart, clearCart, setItemQuantity } =
  cartSlice.actions;

export default cartReducer;
