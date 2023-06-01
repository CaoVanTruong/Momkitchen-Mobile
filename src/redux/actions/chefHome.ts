import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from 'constants/api';
import { IOrder } from 'types/order';
import { IUserState } from 'types/user';
import api from 'utils/api';

const GET_REVENUE = 'getRevenue';
const GET_NUM_OF_ORDERS = 'getNumOfOrders';
const GET_RECENT_ORDERS = 'getRecentOrders';

export const getRevenue = createAsyncThunk<number>(
  GET_REVENUE,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const res = await api.get(`orders/chef/${user.user?.id}/revenues`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message);
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);

export const getNumOfOrders = createAsyncThunk<number>(
  GET_NUM_OF_ORDERS,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const res = await api.get(`orders/chef/${user.user?.id}/count`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message);
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);

export const getRecentOrders = createAsyncThunk<IOrder[]>(
  GET_RECENT_ORDERS,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const res = await api.get(`orders/chef/${user.user?.id}/recent-order`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message);
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);
