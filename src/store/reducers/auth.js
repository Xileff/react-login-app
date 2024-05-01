import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from '../../config';
import axios from 'axios';

const initialState = {
  accessToken: null,
  isLoading: false,
  username: null,
};

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${env.apiHost}/auth/login`, data);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('accessToken');
  console.log('removing...');
  localStorage.removeItem('username');
});

export const getCurrentUser = createAsyncThunk('user', async (_, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(`${env.apiHost}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.accessToken = null;
        state.username = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.accessToken = null;
        state.username = null;
      });
  },
});

export default authSlice.reducer;
