import { createSlice } from '@reduxjs/toolkit';
import {
  addFoodPackage,
  getFoodPackages,
  getFoodPackagesInSession,
  updateFoodPackage,
} from 'redux/actions/foodPackage';
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
    builder.addCase(getFoodPackagesInSession.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getFoodPackagesInSession.fulfilled, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(getFoodPackagesInSession.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(addFoodPackage.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(addFoodPackage.fulfilled, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(addFoodPackage.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(updateFoodPackage.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(updateFoodPackage.fulfilled, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(updateFoodPackage.rejected, state => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default foodPackageSlice.reducer;
