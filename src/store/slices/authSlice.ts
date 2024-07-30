import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login } from '@/apis';
import { IAuthLoginBodyRequest, IAuthLoginResponse } from '@/interfaces/auth.interface';
import { IError } from '@/interfaces/http.interface';
import { LocalStorageKey } from '@/interfaces/storage.interface';

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  error: IError | null;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  token: null,
  error: null,
};

export const authLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: IAuthLoginBodyRequest, { rejectWithValue }) => {
    try {
      const response = await login(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error as IError);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem(LocalStorageKey.TOKEN); // Store the token in localStorage
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action: PayloadAction<IAuthLoginResponse>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem(LocalStorageKey.TOKEN, action.payload.token); // Store the token in localStorage
      })
      .addCase(authLogin.rejected, (state, action: PayloadAction<any>) => { // Should be IError
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
