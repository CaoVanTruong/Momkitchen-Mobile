import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from 'constants/api';
import { IFoodPackage } from 'types/foodPackage';
import { IUserState } from 'types/user';
import api from 'utils/api';

const FOOD_PACKAGES = 'foodPackages';

export const getFoodPackages = createAsyncThunk<IFoodPackage[]>(
  FOOD_PACKAGES,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const res = await api.get(`foodpackages/chef/${user.user?.id}`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        }
      } catch (err) {
        reject(err);
      }
    }),
);
