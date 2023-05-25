export type IDishType = {
  id: number;
  name: string;
  description: string;
};

export type IDishTypeState = {
  isLoading: boolean;
  items: IDishType[];
};

export type IDish = {
  id: number;
  name: string;
  image: string;
  dishType: IDishType | null;
};
export type IDishRequest = {
  name: string;
  dishTypeId: number | null;
  image: string | null;
};
