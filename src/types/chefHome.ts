import { IOrder } from './order';

export type IChefHomeState = {
  isLoading: boolean;
  isStatisticLoading: boolean;
  numberOfOrders: number;
  revenue: number;
  orders: IOrder[];
};
