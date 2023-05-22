export type ISessionState = {
  isLoading: boolean;
  items: ISession[];
};

export type ISession = {
  id: number;
  startTime: string;
  endTime: string;
  createdDate: string;
  status: boolean;
  title: string;
};
