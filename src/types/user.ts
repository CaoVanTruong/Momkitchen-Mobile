export type UserState = {
  name: string;
  email: string;
  password: string;
  role?: 'Chef' | 'Driver';
};
