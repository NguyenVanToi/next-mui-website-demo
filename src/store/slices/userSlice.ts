import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsers } from '@/apis';
import { IError } from '@/interfaces/http.interface';
import { IUser } from '@/interfaces/user.interface';

interface AuthState {
  loading: boolean;
  users: IUser[];
  error: IError | null;
}

const initialState: AuthState = {
  loading: false,
  users: [],
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return response.data;
    } catch (error) {
      console.log('error :>> ', error);
      return rejectWithValue(error as IError);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        console.log('action :>> ', action);
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => { // Should be IError
        state.loading = false;
        state.users = [];
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
