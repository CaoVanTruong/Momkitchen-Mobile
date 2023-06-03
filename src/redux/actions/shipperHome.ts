import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from 'constants/api';
import { IShipperOrder } from 'types/shipperHome';
import { IUserState } from 'types/user';
import api from 'utils/api';

const GET_NUM_OF_ORDERS = 'getNumOfOrders';
const GET_RECENT_ORDERS = 'getRecentOrders';

export const getNumOfOrders = createAsyncThunk<number>(
  GET_NUM_OF_ORDERS,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const res = await api.get(
          `orders/shipper/${user.user?.id}/count-success`,
        );

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

export const getReadyOrders = createAsyncThunk<IShipperOrder[]>(
  GET_RECENT_ORDERS,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const res = await api.get(
          `orders/shipper/${user.user?.id}/order-ready-ship`,
        );

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          const listOrders = res.data.message;
          const returnData = listOrders.map((item: any) => ({
            ...item.order,
            chef: {
              id: item?.chefID,
              name: item?.chefName,
              phone: item?.chefPhone,
              address: item?.chefAddress,
              buildingName: item?.buildingName,
            },
          }));
          resolve(returnData as IShipperOrder[]);
        } else {
          reject(res.data.message);
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);
