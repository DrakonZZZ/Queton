import { Schema } from 'mongoose';
import { IUser } from '../db/models/user.model';

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface AskParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.types.ObjectId | IUser;
  path: string;
}
