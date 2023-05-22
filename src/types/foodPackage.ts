export type IFoodPackage = {
  id: number;
  name: string;
  image: string | null;
  defaultPrice: number;
  description: string;
};

export type IFoodPackageState = {
  isLoading: boolean;
  items: IFoodPackage[];
};
