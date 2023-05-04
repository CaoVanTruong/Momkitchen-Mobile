import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from 'types/user';

const initialValue: IUserState = {
  name: '',
  email: '',
  password: '',
  role: undefined,
  phone: '',
  address: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
  reducers: {
    login: (): IUserState => {
      return {
        name: 'foo',
        email: 'abc@example.com',
        password: 'password',
        role: 'Chef',
        phone: '0987654321',
        address: 'Binh Thanh District, Ho Chi Minh City, Vietnam',
      };
    },
    logout: (): IUserState => initialValue,
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
