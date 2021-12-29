import { ObjectId } from "bson";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
}
