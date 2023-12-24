import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cart';

export type cartStateType = {
  cartItems: CartItem[];
  totalAmount: number;
};

const initialState: cartStateType = {
  cartItems: [],
  totalAmount: 0,
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
        alert('item already in cart');
      } else {
        state.cartItems.push(action.payload);
      }
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
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
        item.totalPrice = item.price * action.payload.quantity;
      }
    },

    totalCartPrice: (state) => {
      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + item.totalPrice;
      }, 0);
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

const cartReducer = cartSlice.reducer;
export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  setItemQuantity,
  totalCartPrice,
} = cartSlice.actions;

export default cartReducer;
