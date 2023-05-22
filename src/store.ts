import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/slices/User';
import foodPackageReducer from 'redux/slices/FoodPackage';
import session from 'redux/slices/Session';

export const store = configureStore({
  reducer: {
    user: userReducer,
    foodPackage: foodPackageReducer,
    session: session,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
