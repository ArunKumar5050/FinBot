// filepath: c:\Users\arunp\OneDrive\Desktop\FinBot\client\src\store\store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionReducer from './transactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer
  },
});