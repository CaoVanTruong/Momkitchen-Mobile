import { IFoodStyle } from './foodStyle';

export type IFoodPackage = {
  id: number;
  name: string;
  image: string | null;
  defaultPrice: number;
  description: string;
  foodPackageStyle: IFoodStyle;
};

export type IFoodPackageState = {
  isLoading: boolean;
  items: IFoodPackage[];
};

export type IFoodPackageInSession = {
  id: number;
  price: number;
  quantity: number;
  remainQuantity: number;
  createDate: string;
  foodPackage: IFoodPackage;
};

export type IAddFoodPackageToSessionRequest = {
  foodPackageId: number;
  sessionId: number;
  price: number;
  quantity: number;
};
