export interface MessageModel {
  _id?: string;
  message: string;
  sourceUser: string;
  targetUser: string;
  image?: string;
}
