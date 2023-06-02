import { createSlice } from '@reduxjs/toolkit';
import { cancelOrder, changeOrderStatus, getOrders } from 'redux/actions/order';
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
    builder.addCase(cancelOrder.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getOrders.fulfilled, (_, { payload }) => ({
      isLoading: false,
      items: payload,
    }));
    builder.addCase(changeOrderStatus.fulfilled, (state, { payload }) => {
      const { orderId, status } = payload;

      const draftState = state.items.map(item =>
        item.id === orderId ? { ...item, deliveryStatus: status } : item,
      );

      return {
        isLoading: false,
        items: [...draftState],
      };
    });
    builder.addCase(cancelOrder.fulfilled, state => ({
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
    builder.addCase(cancelOrder.rejected, state => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default orderSlice.reducer;
