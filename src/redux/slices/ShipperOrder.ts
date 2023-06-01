import { createSlice } from '@reduxjs/toolkit';
import { getShipperOrders } from 'redux/actions/order';
import { IShipperOrderState } from 'types/shipperHome';

const initialState: IShipperOrderState = {
  isLoading: false,
  orders: [],
};

const shipperOrderSlice = createSlice({
  name: 'shipperOrder',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getShipperOrders.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getShipperOrders.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      orders: payload,
    }));
    builder.addCase(getShipperOrders.rejected, state => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default shipperOrderSlice.reducer;
