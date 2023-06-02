import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_STATUS } from 'constants/api';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AddFoodPackageFormType } from 'schemas/foodPackageSchemas';
import {
  IAddFoodPackageToSessionRequest,
  IFoodPackage,
  IFoodPackageInSession,
  IUpdateFoodPackage,
} from 'types/foodPackage';
import { IUserState } from 'types/user';
import api from 'utils/api';
import { storage } from 'utils/firebase';

const FOOD_PACKAGES = 'foodPackages';
const ADD_FOOD_PACKAGES = 'addFoodPackages';
const REMOVE_FOOD_PACKAGES = 'removeFoodPackages';
const UPDATE_FOOD_PACKAGES = 'updateFoodPackages';
const FOOD_PACKAGES_IN_SESSION = 'foodPackagesInSessions';
const ADD_FOOD_PACKAGES_IN_SESSION = 'addFoodPackagesInSessions';

export const getFoodPackages = createAsyncThunk<IFoodPackage[]>(
  FOOD_PACKAGES,
  (_, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        const res = await api.get(`foodpackages/chef/${user.user?.id}`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject('Error orcurred');
        }
      } catch (err) {
        reject(err);
      }
    }),
);

export const addFoodPackage = createAsyncThunk<number, AddFoodPackageFormType>(
  ADD_FOOD_PACKAGES,
  (pkgData, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };

        let imgUrl = null;

        if (pkgData.image && pkgData.image.uri) {
          const imageRef = ref(storage, `image/${pkgData.image.fileName}`);
          const img = await fetch(pkgData.image.uri);
          const bytes = await img.blob();
          await uploadBytes(imageRef, bytes);
          imgUrl = await getDownloadURL(imageRef);
        }

        const params = {
          foodPackageRequest: {
            name: pkgData.name,
            image: imgUrl,
            defaultPrice: pkgData.defaultPrice,
            chefId: user.user?.id,
            description: pkgData.description,
            foodPackageStyleId: pkgData.foodPackageStyleId,
          },
          dishFoodPackageRequests: pkgData.dishes?.map(item => ({
            dishId: item.dishId,
            quantity: item.quantity,
          })),
        };

        const res = await api.post('foodpackages', params);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message);
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);

export const updateFoodPackage = createAsyncThunk<number, IUpdateFoodPackage>(
  UPDATE_FOOD_PACKAGES,
  (pkgData, { getState }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { user } = getState() as { user: IUserState };
        let imgUrl = pkgData.foodPackage.image.uri;
        if (
          pkgData.foodPackage.image &&
          pkgData.foodPackage.image.fileName &&
          pkgData.foodPackage.image.uri
        ) {
          const imageRef = ref(
            storage,
            `image/${pkgData.foodPackage.image.fileName}`,
          );
          const img = await fetch(pkgData.foodPackage.image.uri);
          const bytes = await img.blob();
          await uploadBytes(imageRef, bytes);
          imgUrl = await getDownloadURL(imageRef);
        }

        const params = {
          foodPackageRequest: {
            name: pkgData.foodPackage.name,
            image: imgUrl,
            defaultPrice: pkgData.foodPackage.defaultPrice,
            chefId: user.user?.id,
            description: pkgData.foodPackage.description,
            foodPackageStyleId: pkgData.foodPackage.foodPackageStyleId,
          },
          dishFoodPackageRequests: pkgData.foodPackage.dishes?.map(item => ({
            dishId: item.dishId,
            quantity: item.quantity,
          })),
        };

        const res = await api.put(
          `foodPackages/${pkgData.foodPackageId}`,
          params,
        );

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject(res.data.message);
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);

export const removeFoodPackage = createAsyncThunk<number, number>(
  REMOVE_FOOD_PACKAGES,
  foodPackageId =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await api.delete(`foodpackages/${foodPackageId}`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(foodPackageId);
        } else {
          reject(res.data.message);
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);

export const getFoodPackagesInSession = createAsyncThunk<
  IFoodPackageInSession[],
  number
>(
  FOOD_PACKAGES_IN_SESSION,
  sessionId =>
    new Promise<IFoodPackageInSession[]>(async (resolve, reject) => {
      try {
        const res = await api.get(`foodpackageinsessions/session/${sessionId}`);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.message);
        } else {
          reject('Error orcurred');
        }
      } catch (error) {
        reject(error);
      }
    }),
);

export const addFoodPackageToSession = createAsyncThunk<
  string,
  IAddFoodPackageToSessionRequest
>(
  ADD_FOOD_PACKAGES_IN_SESSION,
  reqData =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await api.post('foodpackageinsessions', reqData);

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          resolve(res.data.isSuccess);
        } else {
          reject('Error orcurred');
        }
      } catch (error: any) {
        reject(error.message);
      }
    }),
);
