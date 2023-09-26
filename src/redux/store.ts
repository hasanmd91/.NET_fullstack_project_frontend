import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
