import { createSlice } from '@reduxjs/toolkit';
import {
  addDish,
  addDishTypes,
  addFoodStyle,
  getDishTypes,
  getDishes,
  getFoodStyles,
  removeDishTypes,
  removeFoodStyle,
} from 'redux/actions/market';
import { IMarketState } from 'types/market';

const initialState: IMarketState = {
  isLoading: false,
  dishTypes: [],
  foodStyles: [],
  dishes: [],
};

const dishTypeSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDishTypes.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getDishTypes.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      dishTypes: payload,
    }));
    builder.addCase(getDishTypes.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(addDishTypes.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(addDishTypes.fulfilled, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(addDishTypes.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(removeDishTypes.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(removeDishTypes.fulfilled, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(removeDishTypes.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(getDishes.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getDishes.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      dishes: payload,
    }));
    builder.addCase(getDishes.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(addDish.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(addDish.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      dishes: [...state.dishes, payload],
    }));
    builder.addCase(addDish.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(getFoodStyles.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getFoodStyles.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      foodStyles: payload,
    }));
    builder.addCase(getFoodStyles.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(addFoodStyle.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(addFoodStyle.fulfilled, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(addFoodStyle.rejected, state => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(removeFoodStyle.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(removeFoodStyle.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      foodStyles: state.foodStyles.filter(fs => fs.id !== payload),
    }));
    builder.addCase(removeFoodStyle.rejected, state => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default dishTypeSlice.reducer;
