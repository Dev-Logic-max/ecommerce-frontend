// lib/store/slices/developerSlice.ts
import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../../lib/api/auth';
import { toast } from 'react-toastify';

// Role Requests Sub-Slice
const roleRequestSlice = createSlice({
  name: 'developer/roleRequest',
  initialState: { roleRequests: [] as any[], loading: false },
  reducers: {
    setRoleRequests: (state, action: PayloadAction<any[]>) => { state.roleRequests = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
  },
});

export const { setRoleRequests: setDeveloperRoleRequests, setLoading: setRoleRequestLoading } = roleRequestSlice.actions;

export const fetchRoleRequests = () => async (dispatch: any) => {
  dispatch(setRoleRequestLoading(true));
  try {
    const response = await authApi.getRoleRequests();
    dispatch(setDeveloperRoleRequests(response.data || []));
  } catch (error) {
    toast.error('Failed to fetch role requests!');
    dispatch(setDeveloperRoleRequests([]));
  } finally {
    dispatch(setRoleRequestLoading(false));
  };
};

export const approveRole = (requestId: number) => async (dispatch: any) => {
  dispatch(setRoleRequestLoading(true));
  try {
    await authApi.approveRole(requestId);
    toast.success('Role request approved!');
    dispatch(fetchRoleRequests());
  } catch (error) {
    toast.error('Failed to approve request!');
  } finally {
    dispatch(setRoleRequestLoading(false));
  }
};

export const rejectRole = (requestId: number) => async (dispatch: any) => {
  dispatch(setRoleRequestLoading(true));
  try {
    await authApi.rejectRole(requestId);
    toast.success('Role request rejected!');
    dispatch(fetchRoleRequests());
  } catch (error) {
    toast.error('Failed to reject request!');
  } finally {
    dispatch(setRoleRequestLoading(false));
  }
};

// Users Sub-Slice
const allUsersSlice = createSlice({
  name: 'developer/allUsers',
  initialState: { users: [] as any[], loading: false },
  reducers: {
    setUsers: (state, action: PayloadAction<any[]>) => { state.users = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
  },
});

export const { setUsers: setUsers, setLoading: setUserLoading } = allUsersSlice.actions;

export const fetchUsers = () => async (dispatch: any) => {
  dispatch(setUserLoading(true));
  try {
    const response = await authApi.getUsers();
    dispatch(setUsers(response.data || []));
  } catch (error) {
    toast.error('Failed to fetch users!');
    dispatch(setUsers([]));
  } finally {
    dispatch(setUserLoading(false));
  };
};

export const createUser = (userData: { username: string; password: string; roleId: number }) => async (dispatch: any) => {
  try {
    await authApi.createUser(userData);
    toast.success('User created successfully!');
    dispatch(fetchUsers());
  } catch (error) {
    toast.error('Failed to create user!');
  }
};

// Shops Sub-Slice
const shopSlice = createSlice({
  name: 'developer/shop',
  initialState: { shops: [] as any[], loading: false },
  reducers: {
    setShops: (state, action: PayloadAction<any[]>) => { state.shops = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
  },
});

export const { setShops: setDeveloperShops, setLoading: setShopLoading } = shopSlice.actions;

export const fetchShops = () => async (dispatch: any) => {
  dispatch(setShopLoading(true));
  try {
    const response = await authApi.getPendingShops();
    dispatch(setDeveloperShops(response.data || []));
  } catch (error) {
    toast.error('Failed to fetch shops!');
    dispatch(setDeveloperShops([]));
  } finally {
    dispatch(setShopLoading(false));
  };
};

export const approveShop = (shopId: number) => async (dispatch: any) => {
  dispatch(setShopLoading(true));
  try {
    await authApi.approveShop(shopId);
    toast.success('Shop approved!');
    dispatch(fetchShops());
  } catch (error) {
    toast.error('Failed to approve shop!');
  } finally {
    dispatch(setShopLoading(false));
  }
};

export const rejectShop = (shopId: number) => async (dispatch: any) => {
  dispatch(setShopLoading(true));
  try {
    await authApi.rejectShop(shopId);
    toast.success('Shop rejected!');
    dispatch(fetchShops());
  } catch (error) {
    toast.error('Failed to reject shop!');
  } finally {
    dispatch(setShopLoading(false));
  }
};

// Warehouses Sub-Slice
const warehouseSlice = createSlice({
  name: 'developer/warehouse',
  initialState: { warehouses: [] as any[], loading: false },
  reducers: {
    setWarehouses: (state, action: PayloadAction<any[]>) => { state.warehouses = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
  },
});

export const { setWarehouses: setDeveloperWarehouses, setLoading: setWarehouseLoading } = warehouseSlice.actions;

export const fetchWarehouses = () => async (dispatch: any) => {
  dispatch(setWarehouseLoading(true));
  try {
    const response = await authApi.getPendingWarehouses();
    dispatch(setDeveloperWarehouses(response.data || []));
  } catch (error) {
    toast.error('Failed to fetch warehouse requests!');
    dispatch(setDeveloperWarehouses([]));
  } finally {
    dispatch(setWarehouseLoading(false));
  };
};

export const approveWarehouse = (warehouseId: number) => async (dispatch: any) => {
  dispatch(setWarehouseLoading(true));
  try {
    await authApi.approveWarehouse(warehouseId);
    toast.success('Warehouse approved!');
    dispatch(fetchWarehouses());
  } catch (error) {
    toast.error('Failed to approve warehouse!');
  } finally {
    dispatch(setWarehouseLoading(false));
  }
};

export const rejectWarehouse = (warehouseId: number) => async (dispatch: any) => {
  dispatch(setWarehouseLoading(true));
  try {
    await authApi.rejectWarehouse(warehouseId);
    toast.success('Warehouse rejected!');
    dispatch(fetchWarehouses());
  } catch (error) {
    toast.error('Failed to reject warehouse!');
  } finally {
    dispatch(setWarehouseLoading(false));
  }
};

export const createRole = (roleName: string) => async (dispatch: any) => {
  try {
    await authApi.createRole({ name: roleName });
    toast.success('Role created successfully!');
  } catch (error) {
    toast.error('Failed to create role!');
  }
};

const paginationSlice = createSlice({
  name: 'developer/pagination',
  initialState: { currentPage: 1, itemsPerPage: 10, selectedRole: null as string | null },
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => { state.currentPage = action.payload; },
    setItemsPerPage: (state, action: PayloadAction<number>) => { state.itemsPerPage = action.payload; },
    setSelectedRole: (state, action: PayloadAction<string | null>) => { state.selectedRole = action.payload; },
  },
});

export const { setCurrentPage, setItemsPerPage, setSelectedRole } = paginationSlice.actions;

// Combine Sub-Slices into a Single Reducer
const developerSlices = combineReducers({
  roleRequest: roleRequestSlice.reducer,
  allUsers: allUsersSlice.reducer,
  shop: shopSlice.reducer,
  warehouse: warehouseSlice.reducer,
  pagination: paginationSlice.reducer,
});

export default developerSlices;