import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
};

type AuthState = {
  email: string;
  id: string;
  accessToken: string;
};

export const loginThunk = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(
        'https://api.v2.react-learning.ru/auth/login',
        data,
      );
      return response.data;
    } catch (e: any) {
      return rejectWithValue('Some error');
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    id: '',
    accessToken: '',
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.email = '';
      state.id = '';
      state.accessToken = '';
      localStorage.removeItem('token');
    },
    setToken: (state, { payload }) => {
      state.accessToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, { payload }: PayloadAction<LoginResponse>) => {
      state.email = payload.user.email;
      state.id = payload.user.id;
      state.accessToken = payload.accessToken;
      localStorage.setItem('token', payload.accessToken);
    });
  },
});

export const { logout, setToken } = authSlice.actions;
