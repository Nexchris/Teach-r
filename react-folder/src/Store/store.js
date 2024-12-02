import { configureStore } from '@reduxjs/toolkit';
import productSlice from './Slices/productSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
  },
});

export default store;
