import { IFoodPackageInSession } from './foodPackage';
import { ISession } from './session';

export type IOrder = {
  id: number;
  date: string;
  batchId: number | null;
  status: string;
  deliveryStatus: string;
  note: string;
  building: IBuilding;
  customer: ICustomer;
  orderDetails: IOrderDetail[];
  session: ISession;
};

export type IOrderDetail = {
  quantity: number;
  sessionPackage: IFoodPackageInSession;
};

export type ICustomer = {
  id: number;
  name: string;
  phone: string;
  image: string | null;
  email: string;
};

export type IBuilding = {
  id: number;
  name: string;
  address: string;
};

export type IOrderState = {
  isLoading: boolean;
  items: IOrder[];
};
