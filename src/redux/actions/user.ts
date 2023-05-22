import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from 'utils/api';
import { LoginFormType } from 'schemas/loginSchema';
import { API_STATUS } from 'constants/api';

const LOGIN = 'login';
const LOGOUT = 'logout';
const CACHE_USER = 'cachedUser';

export const login = createAsyncThunk<IUser, LoginFormType>(
  LOGIN,
  loginData =>
    new Promise(async (resolve, reject) => {
      try {
        const { email, password } = loginData;
        const res = await api<any>({
          method: 'POST',
          url: 'accounts/signIn',
          data: {
            email,
            password,
          },
        });

        if (res.status === API_STATUS.OK && res.data.isSuccess) {
          const token = res.data.message.jwTtoken;
          const resBody = res.data.message.account;

          if (resBody.chefs[0]?.id) {
            const data: IUser = {
              ...resBody.chefs[0],
              token,
              role: 'Chef',
            };
            AsyncStorage.setItem('loginData', JSON.stringify(data));
            resolve(data);
          }

          if (resBody.shippers[0]?.id) {
            const data: IUser = {
              ...resBody.shippers[0],
              token,
              role: 'Driver',
            };
            AsyncStorage.setItem('loginData', JSON.stringify(data));
            resolve(data);
          }
        }
      } catch (error) {
        reject(error);
      }
    }),
);

export const getCacheUserState = createAsyncThunk(CACHE_USER, async () => {
  const data = await AsyncStorage.getItem('loginData');

  if (data) {
    return JSON.parse(data) as IUser;
  }
  return null;
});

export const logout = createAsyncThunk(LOGOUT, async () => {
  await AsyncStorage.removeItem('loginData');
});
