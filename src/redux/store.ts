import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/lib/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';
import { PersistConfig } from 'redux-persist/lib/types';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/OrderReducer';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

const store = createStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

setupListeners(store.dispatch);

export default store;
