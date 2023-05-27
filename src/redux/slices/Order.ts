import { createSlice } from '@reduxjs/toolkit';
import { changeOrderStatus, getOrders } from 'redux/actions/order';
import { IOrderState } from 'types/order';

const initialState: IOrderState = {
  isLoading: false,
  items: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getOrders.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(changeOrderStatus.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getOrders.fulfilled, (_, { payload }) => ({
      isLoading: false,
      items: payload,
    }));
    builder.addCase(changeOrderStatus.fulfilled, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(getOrders.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(changeOrderStatus.rejected, state => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default orderSlice.reducer;
