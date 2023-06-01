import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { API_STATUS } from 'constants/api';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AddDishFormType } from 'schemas/dishSchemas';
import { IDish, IDishType } from 'types/dish';
import { IFoodStyle } from 'types/foodStyle';
import { IUserState } from 'types/user';
import api from 'utils/api';
import { storage } from 'utils/firebase';

const DISH_TYPES = 'dishTypes';
const ADD_DISH_TYPES = 'addDishTypes';
const REMOVE_DISH_TYPES = 'removeDishTypes';
const DISHES_LIST = 'dishesList';
const ADD_DISH = 'addDish';
const FOOD_STYLES = 'foodStyles';
const ADD_FOOD_STYLES = 'addFoodStyles';
const REMOVE_FOOD_STYLES = 'removeFoodStyles';

export const getDishTypes = createAsyncThunk<IDishType[]>(
  DISH_TYPES,
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as { user: IUserState };

      const res = await api.get(`DishTypes/${user.user?.id}`);

      if (res.status === API_STATUS.OK && res.data.isSuccess) {
        return res.data.message;
      } else {
        isRejectedWithValue(res.data.message || 'Error orcurred');
      }
    } catch (error) {
      rejectWithValue('Error orcurred');
    }
    return [];
  },
);

export const addDishTypes = createAsyncThunk<IDishType, Partial<IDishType>>(
  ADD_DISH_TYPES,
  (dishData, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const res = await api.post('DishTypes', {
          ...dishData,
          chefId: user.user?.id,
        });
        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve({
            name: dishData.name || '',
            description: dishData.description || '',
            id: Date.now(),
          });
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);

export const removeDishTypes = createAsyncThunk<boolean, number>(
  REMOVE_DISH_TYPES,
  dishTypeId =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await api.delete(`DishTypes/${dishTypeId}`);
        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);

export const getDishes = createAsyncThunk<IDish[]>(
  DISHES_LIST,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const res = await api.get(`dishes/chef/${user.user?.id}`);
        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);

export const addDish = createAsyncThunk<IDish, AddDishFormType>(
  ADD_DISH,
  (dishData, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };

        const params = {
          name: dishData.name,
          dishTypeId: dishData.dishTypeId || null,
          chefId: user.user?.id,
        };

        let imgUrl = null;

        if (dishData.image && dishData.image.uri) {
          const imageRef = ref(storage, `image/${dishData.image.fileName}`);
          const img = await fetch(dishData.image.uri);
          const bytes = await img.blob();
          await uploadBytes(imageRef, bytes);
          imgUrl = await getDownloadURL(imageRef);
        }

        const res = await api.post('dishes', { ...params, image: imgUrl });

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve({ ...res.data.message, image: imgUrl });
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);

export const getFoodStyles = createAsyncThunk<IFoodStyle[]>(
  FOOD_STYLES,
  () =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await api.get('foodpackagestyles');
        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);

export const addFoodStyle = createAsyncThunk<boolean, Partial<IFoodStyle>>(
  ADD_FOOD_STYLES,
  (dishData, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const reqData = {
          title: dishData.title || '',
          chefId: user.user?.id,
        };
        const res = await api.post('foodpackagestyles', reqData);
        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);

export const removeFoodStyle = createAsyncThunk<number, number>(
  REMOVE_FOOD_STYLES,
  foodStyleId =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await api.delete(`foodpackagestyles/${foodStyleId}`);
        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(foodStyleId);
        } else {
          reject(res.data.message || 'Error orcurred');
        }
      } catch (error) {
        reject('Error orcurred');
      }
    }),
);
