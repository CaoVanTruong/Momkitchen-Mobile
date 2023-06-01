import { createSlice } from '@reduxjs/toolkit';
import { getNumOfOrders, getReadyOrders } from 'redux/actions/shipperHome';
import { IShipperHomeState } from 'types/shipperHome';

const initialState: IShipperHomeState = {
  isLoading: false,
  isCountLoading: false,
  numOfOrders: 0,
  orders: [],
};

const shipperHomeSlice = createSlice({
  name: 'shipperHome',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getReadyOrders.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getReadyOrders.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      orders: payload,
    }));
    builder.addCase(getReadyOrders.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(getNumOfOrders.pending, state => ({
      ...state,
      isCountLoading: true,
    }));
    builder.addCase(getNumOfOrders.fulfilled, (state, { payload }) => ({
      ...state,
      isCountLoading: false,
      numOfOrders: payload,
    }));
    builder.addCase(getNumOfOrders.rejected, state => ({
      ...state,
      isCountLoading: false,
    }));
  },
});

export default shipperHomeSlice.reducer;
