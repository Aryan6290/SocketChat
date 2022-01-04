import {UserModel} from './../models/UserModel';
export type RootStackParamsList = {
  SPLASH: undefined;
  LOGIN: undefined;
  SIGNUP: undefined;
  HOME: {
    id: string;
  };
  CHAT: {
    user: UserModel;
    id: string;
  };
};
