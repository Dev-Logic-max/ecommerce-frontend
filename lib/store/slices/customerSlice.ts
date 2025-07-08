// // lib/store/slices/customerSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { authApi } from '../../../lib/api/auth';
// import { toast } from 'react-toastify';

// interface CustomerState {
//   products: any[];
//   orders: any[];
//   loading: boolean;
// }

// const initialState: CustomerState = {
//   products: [],
//   orders: [],
//   loading: false,
// };

// const customerSlice = createSlice({
//   name: 'customer',
//   initialState,
//   reducers: {
//     setProducts: (state, action: PayloadAction<any[]>) => { state.products = action.payload; },
//     setOrders: (state, action: PayloadAction<any[]>) => { state.orders = action.payload; },
//     setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
//   },
// });

// export const { setProducts, setOrders, setLoading } = customerSlice.actions;

// export const fetchProducts = () => async (dispatch: any) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await authApi.getAllProducts();
//     dispatch(setProducts(response.data));
//   } catch (error) {
//     toast.error('Failed to fetch products!');
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export const fetchOrders = () => async (dispatch: any) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await authApi.getUserOrders();
//     dispatch(setOrders(response.data));
//   } catch (error) {
//     toast.error('Failed to fetch orders!');
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export default customerSlice.reducer;

// lib/store/slices/customerSlice.ts
import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../../lib/api/auth';
import { toast } from 'react-toastify';

// Product Sub-Slice
const customerProductSlice = createSlice({
  name: 'customer/product',
  initialState: { products: [] as any[], loading: false },
  reducers: {
    setProducts: (state, action: PayloadAction<any[]>) => { state.products = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
  },
});

export const { setProducts: setCustomerProducts, setLoading: setCustomerProductLoading } = customerProductSlice.actions;

export const fetchProducts = () => async (dispatch: any) => {
  dispatch(setCustomerProductLoading(true));
  try {
    const response = await authApi.getAllProducts();
    dispatch(setCustomerProducts(response.data));
  } catch (error) {
    toast.error('Failed to fetch products!');
  } finally {
    dispatch(setCustomerProductLoading(false));
  }
};

// Order Sub-Slice
const customerOrderSlice = createSlice({
  name: 'customer/order',
  initialState: { orders: [] as any[], loading: false },
  reducers: {
    setOrders: (state, action: PayloadAction<any[]>) => { state.orders = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
  },
});

export const { setOrders: setCustomerOrders, setLoading: setCustomerOrderLoading } = customerOrderSlice.actions;

export const fetchOrders = () => async (dispatch: any) => {
  dispatch(setCustomerOrderLoading(true));
  try {
    const response = await authApi.getUserOrders();
    dispatch(setCustomerOrders(response.data));
  } catch (error) {
    toast.error('Failed to fetch orders!');
  } finally {
    dispatch(setCustomerOrderLoading(false));
  }
};

// Combine Sub-Slices into a Single Reducer
const customerSlices = combineReducers({
  product: customerProductSlice.reducer,
  order: customerOrderSlice.reducer,
});

export default customerSlices;