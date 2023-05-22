import { createSlice } from '@reduxjs/toolkit';
import { getFoodPackages } from 'redux/actions/foodPackage';
import { IFoodPackageState } from 'types/foodPackage';

const initialState: IFoodPackageState = {
  isLoading: false,
  items: [],
};

const foodPackageSlice = createSlice({
  name: 'foodPackage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFoodPackages.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getFoodPackages.fulfilled, (_, { payload }) => ({
      isLoading: false,
      items: payload,
    }));
    builder.addCase(getFoodPackages.rejected, state => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default foodPackageSlice.reducer;
