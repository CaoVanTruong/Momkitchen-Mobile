import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/slices/User';
import foodPackageReducer from 'redux/slices/FoodPackage';
import session from 'redux/slices/Session';
import market from 'redux/slices/Market';
import chefHome from 'redux/slices/ChefHome';

export const store = configureStore({
  reducer: {
    user: userReducer,
    foodPackage: foodPackageReducer,
    session: session,
    market: market,
    chefHome: chefHome,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
