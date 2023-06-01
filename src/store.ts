import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/slices/User';
import foodPackageReducer from 'redux/slices/FoodPackage';
import session from 'redux/slices/Session';
import market from 'redux/slices/Market';
import chefHome from 'redux/slices/ChefHome';
import orderReducer from 'redux/slices/Order';
import ShipperHomeReducer from 'redux/slices/ShipperHome';
import ShipperOrderReducer from 'redux/slices/ShipperOrder';

export const store = configureStore({
  reducer: {
    user: userReducer,
    foodPackage: foodPackageReducer,
    session: session,
    market: market,
    chefHome: chefHome,
    order: orderReducer,
    shipperHome: ShipperHomeReducer,
    shipperOrder: ShipperOrderReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
