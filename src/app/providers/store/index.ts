import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from 'features/auth/model/authSlice';

import { baseApi, userApi } from 'shared/api/baseApi';

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
