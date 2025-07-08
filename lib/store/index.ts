// lib/store/index.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import customerSlices from './slices/customerSlice';
import retailerSlice from './slices/retailerSlice';
import developerSlices from './slices/developerSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    retailer: retailerSlice,
    customer: customerSlices,
    developer: developerSlices,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;