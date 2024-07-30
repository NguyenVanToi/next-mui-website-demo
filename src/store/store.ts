import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      user: userSlice
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;