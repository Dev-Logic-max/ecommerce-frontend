// lib/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../../lib/api/auth';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface User {
  id: number;
  username: string;
  role: number;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  roleRequests: any[];
}

const initialState: AuthState = {
  user: null,
  loading: true,
  roleRequests: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRoleRequests: (state, action: PayloadAction<any[]>) => {
      state.roleRequests = action.payload;
    },
  },
});

export const { setUser, setLoading, setRoleRequests } = authSlice.actions;

export const verifyToken = (onError: () => void) => async (dispatch: any) => {
  try {
    const response = await authApi.verify();
    dispatch(setUser({ id: response.data.user.sub, username: response.data.user.username, role: response.data.user.role }));
  } catch (error) {
    localStorage.removeItem('token');
    Cookies.remove('token');
    dispatch(setUser(null));
    onError();
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchRoleRequests = () => async (dispatch: any, getState: any) => {
  const { auth } = getState();
  if (!auth.user) return;
  try {
    const response = await authApi.getUserRoleRequests();
    dispatch(setRoleRequests(response.data || []));
  } catch (error) {
    console.error('Failed to fetch role requests:', error);
  }
};

export const logout = (onLogout: () => void) => (dispatch: any) => {
  localStorage.removeItem('token');
  Cookies.remove('token');
  dispatch(setUser(null));
  toast.success('Logged out successfully!');
  onLogout()
};

export default authSlice.reducer;