'use server';

import Tag from '../db/models/tag.model';
import Question from '../db/models/question.model';
import { connectToDb } from '../db/mongoose';
import {
  AskParams,
  GetQuestionsParams,
  GetQuestionByIdParams,
  QuestionVoteParams,
  DeleteQuestionParams,
  EditPostParams,
} from './shared.types';
import User from '../db/models/user.model';
import { revalidatePath } from 'next/cache';
import Answer from '../db/models/answer.model';
import DisplayAction from '../db/models/displayAction.model';
import { FilterQuery } from 'mongoose';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDb();

    const { searchQuery, filter, page = 1, pageSize = 3 } = params;

    const skipPageAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, 'i') },
        },
        {
          content: { $regex: new RegExp(searchQuery, 'i') },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'frequent':
        sortOptions = { view: -1 };
        break;
      case 'unanswered':
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }

    const totalQuestions = await Question.countDocuments(query);

    const questions = await Question.find(query)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .skip(skipPageAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const nextPage = totalQuestions > skipPageAmount + questions.length;

    return { questions, nextPage };
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
    await DisplayAction.create({
      user: author,
      action: 'ask_question',
      question: question._id,
      tags: tagDocuments,
    });

    await User.findByIdAndUpdate(author, { $inc: { level: 10 } });
    //increament author's level points
  } catch (error) {
    console.log(error);
    throw error;
  }
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
    await User.findByIdAndUpdate(userId, {
      $inc: {
        level: hasupVoted ? -2 : 2,
      },
    });

    await User.findByIdAndUpdate(question.author, {
      $inc: {
        level: hasupVoted ? -4 : 4,
      },
    });

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

  await User.findByIdAndUpdate(userId, {
    $inc: { level: hasupVoted ? -1 : 1 },
  });

  await User.findByIdAndUpdate(question.author, {
    $inc: { level: hasupVoted ? -5 : 5 },
  });

  revalidatePath(path);
  try {
    connectToDb();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDb();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await DisplayAction.deleteMany({ question: questionId });

    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editPost(params: EditPostParams) {
  try {
    connectToDb();

    const { questionId, title, content, path } = params;
    const question = await Question.findById(questionId).populate('tags');

    if (!question) {
      throw new Error('Question not found');
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {}
}

export async function getPopularPost() {
  try {
    const popularPosts = await Question.find({}).sort({
      views: -1,
      upvotes: -1,
    });
    return popularPosts;
  } catch (error) {
    console.log(error);
  }
}
