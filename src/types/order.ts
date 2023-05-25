export type IOrderItem = {
  id: string;
  date: string;
  customer: ICustomer;
  quantity: number;
  batchId: number | null;
  time: string;
  status: string;
  deliveryStatus: string;
  deliveryTime: string;
  note: string;
  building: IBuilding;
  orderDetails: IOrderDetail[];
};

export type IOrderDetail = {
  price: number;
  quantity: number;
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
