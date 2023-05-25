import { createSlice } from '@reduxjs/toolkit';
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
  extraReducers: builder => {},
});

export default chefHomeSlice.reducer;
