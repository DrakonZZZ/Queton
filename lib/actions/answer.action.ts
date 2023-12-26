'use server';
import { revalidatePath } from 'next/cache';
import Answer from '../db/models/answer.model';
import Question from '../db/models/question.model';
import { connectToDb } from '../db/mongoose';
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from './shared.types';
import { DeleteReplyParams } from './shared.types';
import DisplayAction from '../db/models/displayAction.model';

export async function createAnswer(params: CreateAnswerParams) {
  connectToDb();
  const { author, content, question, path } = params;

  try {
    const newAnswer = await Answer.create({
      author,
      content,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { replies: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDb();

    const { questionId, sortBy, page = 1, pageSize = 10 } = params;
    const skipPageAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
      case 'highestUpvotes':
        sortOptions = { upvotes: -1 };
        break;
      case 'lowestUpvotes':
        sortOptions = { upvotes: 1 };
        break;
      case 'recent':
        sortOptions = { createdAt: -1 };
        break;
      case 'oldest':
        sortOptions = { createdAt: 1 };
      default:
        break;
    }
    const replies = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name avatar')
      .skip(skipPageAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalReplies = await Answer.countDocuments({
      question: questionId,
    });

    const nextPage = totalReplies > skipPageAmount + replies.length;

    return { replies, nextPage };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDb();

    const { replyId, userId, hasdownVoted, hasupVoted, path } = params;

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

    const answer = await Answer.findByIdAndUpdate(replyId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error('Answer not found');
    }

    //increase user prestige points

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  const { replyId, userId, hasdownVoted, hasupVoted, path } = params;

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

  const answer = await Answer.findByIdAndUpdate(replyId, updateQuery, {
    new: true,
  });

  if (!answer) {
    throw new Error('Answer not found');
  }

  revalidatePath(path);
  try {
    connectToDb();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteReply(params: DeleteReplyParams) {
  try {
    connectToDb();

    const { replyId, path } = params;

    const reply = await Answer.findById({ replyId });

    if (!reply) {
      throw new Error('Answer not found');
    }

    await Answer.deleteOne({ _id: replyId });
    await Question.updateMany(
      { _id: reply.question },
      { $pull: { replies: replyId } }
    );

    await DisplayAction.deleteMany({ replies: replyId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
