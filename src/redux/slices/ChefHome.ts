import { createSlice } from '@reduxjs/toolkit';
import {
  getNumOfOrders,
  getRecentOrders,
  getRevenue,
} from 'redux/actions/chefHome';
import { IChefHomeState } from 'types/chefHome';

const initialState: IChefHomeState = {
  isLoading: false,
  numberOfOrders: 0,
  revenue: 0,
  orders: [],
};

const chefHomeSlice = createSlice({
  name: 'chefHome',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNumOfOrders.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getRevenue.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getRecentOrders.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getNumOfOrders.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      numberOfOrders: payload,
    }));
    builder.addCase(getRevenue.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      revenue: payload,
    }));
    builder.addCase(getRecentOrders.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      orders: payload,
    }));
    builder.addCase(getNumOfOrders.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(getRecentOrders.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(getRevenue.rejected, state => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default chefHomeSlice.reducer;
