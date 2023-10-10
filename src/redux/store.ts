import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    user: userReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
