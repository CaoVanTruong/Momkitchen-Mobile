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
