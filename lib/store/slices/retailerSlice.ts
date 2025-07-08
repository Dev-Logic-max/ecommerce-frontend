// lib/store/slices/retailerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../../lib/api/auth';
import { toast } from 'react-toastify';

interface RetailerState {
  shops: any[];
  products: any[];
  selectedShopId: number | null;
  loading: boolean;
}

const initialState: RetailerState = {
  shops: [],
  products: [],
  selectedShopId: null,
  loading: false,
};

const retailerSlice = createSlice({
  name: 'retailer',
  initialState,
  reducers: {
    setShops: (state, action: PayloadAction<any[]>) => { state.shops = action.payload; },
    setProducts: (state, action: PayloadAction<any[]>) => { state.products = action.payload; },
    setSelectedShopId: (state, action: PayloadAction<number | null>) => { state.selectedShopId = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
  },
});

export const { setShops, setProducts, setSelectedShopId, setLoading } = retailerSlice.actions;

export const fetchShops = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await authApi.getUserShops();
    dispatch(setShops(response.data));
    if (response.data.length > 0) dispatch(setSelectedShopId(response.data[0].id));
  } catch (error) {
    toast.error('Failed to fetch shops!');
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProducts = (shopId: number) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await authApi.getShopProducts(shopId);
    dispatch(setProducts(response.data));
  } catch (error) {
    toast.error('Failed to fetch products!');
  } finally {
    dispatch(setLoading(false));
  }
};

export default retailerSlice.reducer;