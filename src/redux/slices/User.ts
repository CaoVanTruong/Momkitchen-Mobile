import { createSlice } from '@reduxjs/toolkit';
import { UserState } from 'types/user';

const initialValue: UserState = {
  name: '',
  email: '',
  password: '',
  role: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
  reducers: {
    login: (): UserState => {
      return {
        name: 'foo',
        email: 'abc@example.com',
        password: 'password',
        role: 'Chef',
      };
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
