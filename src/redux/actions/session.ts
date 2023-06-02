import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from 'constants/api';
import { ISession } from 'types/session';
import api from 'utils/api';

const SESSION_LIST = 'sessionsList';

export const getSessions = createAsyncThunk<ISession[]>(
  SESSION_LIST,
  () =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await api.get('sessions');

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          const resData = res.data.message as ISession[];
          resolve(resData.filter(s => s.status === true));
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);
