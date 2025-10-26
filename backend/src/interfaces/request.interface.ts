import { Request } from 'express';

export interface IUser {
  id: string;
  email: string;
  name?: string;
}

export interface RequestWithUser extends Request {
  user: IUser;
}
