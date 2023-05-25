import { IOrderItem } from './order';

export type IChefHomeState = {
  isLoading: boolean;
  numberOfOrders: number;
  revenue: number;
  orders: IOrderItem[];
};
