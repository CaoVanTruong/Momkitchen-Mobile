import { createSlice } from '@reduxjs/toolkit';
import {
  cancelOrder,
  changeOrderStatus,
  getShipperOrders,
} from 'redux/actions/order';
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
    builder.addCase(changeOrderStatus.fulfilled, (state, { payload }) => {
      const { orderId, status } = payload;

      const draftState = state.orders.map(item =>
        item.id === orderId ? { ...item, deliveryStatus: status } : item,
      );

      return {
        isLoading: false,
        orders: [...draftState],
      };
    });
    builder.addCase(cancelOrder.fulfilled, (state, { payload }) => {
      const { orderId, status } = payload;

      if (status) {
        const draftState = state.orders.map(item =>
          item.id === orderId ? { ...item, deliveryStatus: status } : item,
        );

        return {
          ...state,
          isLoading: false,
          orders: [...draftState],
        };
      }

      return {
        ...state,
        isLoading: false,
      };
    });
  },
});

export default shipperOrderSlice.reducer;
