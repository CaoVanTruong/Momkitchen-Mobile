import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from 'constants/api';
import { IChangeOrderStatusResponse, IOrder } from 'types/order';
import { IShipperOrder } from 'types/shipperHome';
import { IUserState } from 'types/user';
import api from 'utils/api';

const GET_ORDER = 'getOrder';
const GET_SHIPPER_ORDER = 'getShipperOrder';
const CHANGE_STATUS = 'changeStatus';
const CANCEL_ORDER = 'cancelOrder';

export const getOrders = createAsyncThunk<IOrder[]>(
  GET_ORDER,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };

        const res = await api.get(`orders/chef/${user.user?.id}`);

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

export const changeOrderStatus = createAsyncThunk<
  IChangeOrderStatusResponse,
  number
>(
  CHANGE_STATUS,
  orderId =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await api.put(`orders/${orderId}/status`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          const stt = res.data.message;
          resolve({ orderId, status: stt });
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);

export const cancelOrder = createAsyncThunk<IChangeOrderStatusResponse, number>(
  CANCEL_ORDER,
  orderId =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await api.put(`orders/${orderId}/cancel`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          const isSuccess = res.data.message as boolean;
          resolve({ orderId, status: isSuccess ? 'Failed' : '' });
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);

export const getShipperOrders = createAsyncThunk<IShipperOrder[]>(
  GET_SHIPPER_ORDER,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };

        const res = await api.get(`orders/shipper/${user.user?.id}`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          const listOrders = res.data.message;
          const returnData = listOrders.map((item: any) => ({
            ...item.order,
            chef: {
              id: item.chefID,
              name: item.chefName,
              phone: item.chefPhone,
              address: item.chefAddress,
              buildingName: item.buildingName,
            },
          }));
          resolve(returnData as IShipperOrder[]);
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);
