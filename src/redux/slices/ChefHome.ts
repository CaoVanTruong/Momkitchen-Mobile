import { createSlice } from '@reduxjs/toolkit';
import {
  getNumOfOrders,
  getRecentOrders,
  getRevenue,
} from 'redux/actions/chefHome';
import { changeOrderStatus } from 'redux/actions/order';
import { IChefHomeState } from 'types/chefHome';

const initialState: IChefHomeState = {
  isLoading: false,
  isStatisticLoading: false,
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
      isStatisticLoading: true,
    }));
    builder.addCase(getRevenue.pending, state => ({
      ...state,
      isStatisticLoading: true,
    }));
    builder.addCase(getRecentOrders.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getNumOfOrders.fulfilled, (state, { payload }) => ({
      ...state,
      isStatisticLoading: false,
      numberOfOrders: payload,
    }));
    builder.addCase(getRevenue.fulfilled, (state, { payload }) => ({
      ...state,
      isStatisticLoading: false,
      revenue: payload,
    }));
    builder.addCase(getRecentOrders.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      orders: payload,
    }));
    builder.addCase(getNumOfOrders.rejected, state => ({
      ...state,
      isStatisticLoading: false,
    }));
    builder.addCase(getRecentOrders.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(getRevenue.rejected, state => ({
      ...state,
      isStatisticLoading: false,
    }));
    builder.addCase(changeOrderStatus.fulfilled, (state, { payload }) => {
      const { orderId, status } = payload;

      if (!['New', 'Confirmed', 'Preparing'].includes(status)) {
        return {
          ...state,
          isLoading: false,
          orders: state.orders.filter(o => o.id !== orderId),
        };
      }

      const draftState = state.orders.map(item =>
        item.id === orderId ? { ...item, deliveryStatus: status } : item,
      );

      return {
        ...state,
        isLoading: false,
        orders: [...draftState],
      };
    });
  },
});

export default chefHomeSlice.reducer;
