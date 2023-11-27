'use server';

import TagDb from '../db/models/tag.model';
import Question from '../db/models/question.model';
import { connectToDb } from '../db/mongoose';
import { AskParams, GetQuestionsParams } from './shared.types';
import User from '../db/models/user.model';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDb();

    const questions = await Question.find({})
      .populate({ path: 'tags', model: TagDb })
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
      const existingTag = await TagDb.findOneAndUpdate(
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
