'use server';

import Answer from '../db/models/answer.model';
import Question from '../db/models/question.model';
import Tag from '../db/models/tag.model';
import { connectToDb } from '../db/mongoose';
import { SearchParams } from './shared.types';
import User from '../db/models/user.model';

export async function globalSearch(params: SearchParams) {
  const searchableTypes = ['question', 'answer', 'user', 'tag'];

  try {
    connectToDb();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: 'i' };

    const modelsAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: Tag, searchField: 'name', type: 'tag' },
    ];

    const lowerCaseType = type?.toLowerCase();
    let results = [];

    if (!lowerCaseType || !searchableTypes.includes(lowerCaseType)) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === 'answer'
                ? `Answer containing ${query}`
                : item[searchField],
            type,
            id:
              type === 'user'
                ? item.clerkId
                : type === 'answer'
                ? item.question
                : item.id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === type);
      if (!modelInfo) {
        throw new Error('invalid search type');
      }

      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === 'answer'
            ? `Answer containing ${query}`
            : [modelInfo.searchField],
        type,
        id:
          type === 'user'
            ? item.clerkId
            : type === 'answer'
            ? item.question
            : item.id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
