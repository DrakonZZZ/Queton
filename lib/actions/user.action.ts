'use server';

import { connectToDb } from '../db/mongoose';
import { FilterQuery } from 'mongoose';
import User from '../db/models/user.model';
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  SavedQuestionParams,
  UpdateUserParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '../db/models/question.model';
import Tag from '../db/models/tag.model';
import Answer from '../db/models/answer.model';

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

    // const userQuestionsIds = await Question.find({ author: user._id }).distinct(
    //   '_id'
    // );
    //deleting all the questions
    await Question.deleteMany({ author: user._id });
    // deleting all the replies

    const deleteUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error) {}
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDb();

    // const {page = 1, pageSize = 10, filter, searchQuery} = params;
    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, 'i') },
        },
        {
          username: { $regex: new RegExp(searchQuery, 'i') },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case 'new_users':
        sortOptions = { createdAt: -1 };
        break;
      case 'old_users':
        sortOptions = { createdAt: 1 };
        break;
      case 'top_contributors':
        sortOptions = { level: -1 };
        break;
      default:
        break;
    }

    const users = await User.find(query).sort(sortOptions);

    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function savedQuestion(params: SavedQuestionParams) {
  try {
    connectToDb();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuesions(params: GetSavedQuestionsParams) {
  try {
    connectToDb();

    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : {};

    const user = await User.findOne({ clerkId })
      .populate({
        path: 'saved',
        match: query,
        options: {
          sort: { createdAt: -1 },
        },
        populate: [
          { path: 'tags', model: Tag, select: '_id name' },
          { path: 'author', model: User, select: '_id clerkId name avatar' },
        ],
      })
      .sort({ createdAt: -1 });

    if (!user) {
      throw new Error('User not found');
    }

    const savedQuestions = user.saved;

    return savedQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDb();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error('User not found');
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalReplies = await Answer.countDocuments({ author: user._id });

    return {
      user,
      totalQuestions,
      totalReplies,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDb();

    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({
      author: userId,
    });

    const userQuestions = await Question.find({
      author: userId,
    })
      .sort({ view: -1, upvotes: -1 })
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name avatar');

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserReplies(params: GetUserStatsParams) {
  try {
    connectToDb();

    const { userId, page = 1, pageSize = 10 } = params;

    const totalReplies = await Answer.countDocuments({
      author: userId,
    });

    const userReplies = await Answer.find({
      author: userId,
    })
      .sort({ upvotes: -1 })
      .populate('question', '_id title')
      .populate('author', '_id clerkId name avatar');

    return { totalReplies, replies: userReplies };
  } catch (error) {
    console.log(error);
  }
}
