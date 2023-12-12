'use server';

import DisplayAction from '../db/models/displayAction.model';
import Question from '../db/models/question.model';
import { connectToDb } from '../db/mongoose';
import { ViewQuestionParams } from './shared.types';

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDb();

    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { view: 1 } });

    if (userId) {
      const existingViews = await DisplayAction.findOne({
        user: userId,
        question: questionId,
        action: 'view',
      });

      if (existingViews) {
        return;
      }

      await DisplayAction.create({
        user: userId,
        question: questionId,
        action: 'view',
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
