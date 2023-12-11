'use server';

import Tag from '../db/models/tag.model';
import Question from '../db/models/question.model';
import { connectToDb } from '../db/mongoose';
import {
  AskParams,
  GetQuestionsParams,
  GetQuestionByIdParams,
  QuestionVoteParams,
} from './shared.types';
import User from '../db/models/user.model';
import { revalidatePath } from 'next/cache';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDb();

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User });

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function askQuestion(params: AskParams) {
  try {
    connectToDb();
    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      // checking if tags exist then update else create
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}`, 'i') },
        },
        {
          $setOnInsert: { name: tag },
          $push: { questions: question._id },
        },
        {
          upsert: true,
          new: true,
        }
      );

      tagDocuments.push(existingTag._id);
    }
    // push tags to question id
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    //create an interaction action for ask_question

    //increament author's level points
  } catch (error) {}
}

export async function getQuestionsById(params: GetQuestionByIdParams) {
  try {
    connectToDb();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name avatar',
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDb();

    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error('QUestions not found');
    }

    //increase user prestige points

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  const { questionId, userId, hasdownVoted, hasupVoted, path } = params;

  let updateQuery = {};

  if (hasdownVoted) {
    updateQuery = { $pull: { downvotes: userId } };
  } else if (hasupVoted) {
    updateQuery = {
      $pull: { upvotes: userId },
      $push: { downvotes: userId },
    };
  } else {
    updateQuery = { $addToSet: { downvotes: userId } };
  }

  const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
    new: true,
  });

  if (!question) {
    throw new Error();
  }

  revalidatePath(path);
  try {
    connectToDb();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
