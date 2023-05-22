import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from 'constants/api';
import { ISession } from 'types/session';
import api from 'utils/api';

const SESSION_LIST = 'sessionsList';

export const getSessions = createAsyncThunk<ISession[]>(
  SESSION_LIST,
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('sessions');

      if (res.status === API_STATUS.OK && res.data.isSuccess) {
        return res.data.message;
      }
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);
