import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cart';

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
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },

    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} = cartSlice.actions;

export default cartReducer;
