import { IDish, IDishType } from './dish';
import { IFoodStyle } from './foodStyle';

export type IMarketItem = {
  id: string;
  title: string;
  createdDate: string;
  timeline: string;
};

export type IMarketState = {
  isLoading: boolean;
  dishTypes: IDishType[];
  foodStyles: IFoodStyle[];
  dishes: IDish[];
};
