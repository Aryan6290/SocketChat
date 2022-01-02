import { ObjectId } from "bson";

export interface Message {
  _id?: ObjectId;
  message: string;
  sourceUser: string;
  targetUser: string;
  image?: string;
}
