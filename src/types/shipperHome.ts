import { IBuilding, ICustomer, IOrderDetail } from './order';
import { ISession } from './session';

export type IShipperHomeState = {
  isLoading: boolean;
  isCountLoading: boolean;
  numOfOrders: number;
  orders: IShipperOrder[];
};

export type IShipperOrderState = {
  isLoading: boolean;
  orders: IShipperOrder[];
};

export type IShipperOrder = {
  id: number;
  date: string;
  status: string;
  deliveryStatus: string;
  quantity: number;
  deliveryTime: number;
  note: string;
  totalPrice: number;
  batch: IBatch;
  building: IBuilding;
  customer: ICustomer;
  orderDetails: IOrderDetail[];
  session: ISession;
  chef: IChef;
};

export type IBatch = {
  id: number;
  status: boolean;
};

export type IChef = {
  id: number;
  name: string;
  phone: string;
  address: string;
  buildingName: string;
};
