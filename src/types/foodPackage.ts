import { AddFoodPackageFormType } from 'schemas/foodPackageSchemas';
import { IFoodStyle } from './foodStyle';

export type IFoodPackage = {
  id: number;
  name: string;
  image: string | null;
  defaultPrice: number;
  description: string;
  foodPackageStyle: IFoodStyle | null;
  foodPackageStyleId: number;
  dishFoodPackages: IDishFoodPackage[];
  sessionPackages: ISessionPackage[];
};

export type ISessionPackage = {
  id: number;
  sessionId: number;
};

export type IFoodPackageState = {
  isLoading: boolean;
  items: IFoodPackage[];
};

export type IDishFoodPackage = {
  dishId: number;
  quantity: number;
};

export type IUpdateFoodPackage = {
  foodPackage: AddFoodPackageFormType;
  foodPackageId: number;
};

export type IFoodPackageInSession = {
  id: number;
  price: number;
  quantity: number;
  remainQuantity: number;
  createDate: string;
  foodPackage: IFoodPackage;
  status: number;
};

export type IAddFoodPackageToSessionRequest = {
  foodPackageId: number;
  sessionId: number;
  price: number;
  quantity: number;
};

export enum FoodPackageInSessionStatus {
  New,
  Approved,
  Rejected,
  Cancelled,
}
