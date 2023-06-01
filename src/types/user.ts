export type IUserState = {
  user: IUser | null;
  isLoading: boolean;
};

export type IUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: 'Chef' | 'Shipper';
  phone: string;
  address: string;
  token: string;
};
