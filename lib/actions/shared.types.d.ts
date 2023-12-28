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

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetActivityTagsParams {
  userId: string;
  limit?: number;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetQuestionByIdParams {
  questionId: string;
}

export interface GetQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface CreateAnswerParams {
  content: string;
  author: string;
  question: string;
  path: string;
}

export interface GetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface AnswerVoteParams {
  replyId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface SavedQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}

export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface GetQuestionByIdParams {
  questionId: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}

export interface DeleteReplyParams {
  replyId: string;
  path: string;
}

export interface EditPostParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}

export interface SearchParams {
  query?: string | null;
  type?: string | null;
}
