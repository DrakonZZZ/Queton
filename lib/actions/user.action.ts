'use server';

import { connectToDb } from '../db/mongoose';
import User from '../db/models/user.model';
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '../db/models/question.model';

export async function getUserById(params: any) {
  try {
    connectToDb();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDb();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDb();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate(
      {
        clerkId,
      },
      updateData,
      { new: true }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDb();

    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error('User not found!');
    }

    //delete everything from the db related to user

    const userQuestionsIds = await Question.find({ author: user._id }).distinct(
      '_id'
    );
    //deleting all the questions
    await Question.deleteMany({ author: user._id });
    // deleting all the replies

    const deleteUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error) {}
}
