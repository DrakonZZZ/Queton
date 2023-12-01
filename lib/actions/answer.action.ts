'use server';
import { revalidatePath } from 'next/cache';
import Answer from '../db/models/answer.model';
import Question from '../db/models/question.model';
import { connectToDb } from '../db/mongoose';
import { CreateAnswerParams, GetAnswersParams } from './shared.types';

export async function createAnswer(params: CreateAnswerParams) {
  connectToDb();
  const { author, content, question, path } = params;

  try {
    const newAnswer = await Answer.create({
      author,
      content,
      question,
    });

    console.log(newAnswer);

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

    const { questionId } = params;

    const replies = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name avatar')
      .sort({ createdAt: -1 });

    return { replies };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
