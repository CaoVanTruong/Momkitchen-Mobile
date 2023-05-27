import { createSlice } from '@reduxjs/toolkit';
import { getCacheUserState, login, logout } from 'redux/actions/user';
import { IUserState } from 'types/user';

const initialValue: IUserState = {
  user: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => ({ ...state, isLoading: true }));
    builder.addCase(getCacheUserState.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(logout.pending, state => ({ ...state, isLoading: true }));

    builder.addCase(login.fulfilled, (_, { payload }) => {
      return { isLoading: false, user: payload };
    });
    builder.addCase(login.rejected, state => ({ ...state, isLoading: false }));
    builder.addCase(getCacheUserState.rejected, state => ({
      ...state,
      isLoading: false,
    }));

    builder.addCase(logout.rejected, state => ({ ...state, isLoading: false }));

    builder.addCase(getCacheUserState.fulfilled, (state, { payload }) => {
      if (payload) {
        return { ...state, user: payload, isLoading: false };
      }
    });

    builder.addCase(logout.fulfilled, () => {
      return initialValue;
    });
  },
});

export default userSlice.reducer;
