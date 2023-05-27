import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from 'constants/api';
import { IOrder } from 'types/order';
import { IUserState } from 'types/user';
import api from 'utils/api';

const GET_ORDER = 'getOrder';
const CHANGE_STATUS = 'changeStatus';

export const getOrders = createAsyncThunk<IOrder[]>(
  GET_ORDER,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };

        const res = await api.get(`orders/chef/${user.user?.id}`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          const resList = res.data.message as any[];

          if (resList.length > 0) {
            resolve(resList.map(item => item.order));
          } else {
            resolve([]);
          }
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);

export const changeOrderStatus = createAsyncThunk<string, number>(
  CHANGE_STATUS,
  orderId =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await api.put(`orders/${orderId}/status`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);
