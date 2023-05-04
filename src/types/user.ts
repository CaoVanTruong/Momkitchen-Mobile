export type IUserState = {
  name: string;
  email: string;
  password: string;
  role?: 'Chef' | 'Driver';
  phone: string;
  address: string;
};
