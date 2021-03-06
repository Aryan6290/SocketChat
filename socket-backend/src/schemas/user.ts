import { ObjectId } from "bson";

export interface User {
  _id?: ObjectId;
  userName: string;
  email: string;
  password: string;
  image?: string;
}
