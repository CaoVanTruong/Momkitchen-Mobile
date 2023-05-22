import { createSlice } from '@reduxjs/toolkit';
import { getSessions } from 'redux/actions/session';
import { ISessionState } from 'types/session';

const initialState: ISessionState = {
  isLoading: false,
  items: [],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSessions.pending, state => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getSessions.fulfilled, (_, { payload }) => ({
      isLoading: false,
      items: payload,
    }));
    builder.addCase(getSessions.rejected, state => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default sessionSlice.reducer;
