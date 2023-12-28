'use server';

import { FilterQuery } from 'mongoose';
import Question from '../db/models/question.model';
import Tag, { ITag } from '../db/models/tag.model';
import User from '../db/models/user.model';
import { connectToDb } from '../db/mongoose';
import {
  GetActivityTagsParams,
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
} from './shared.types';
import { skip } from 'node:test';

export async function getAcivityTags(params: GetActivityTagsParams) {
  try {
    connectToDb();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    //all interaction tags by the user

    return [
      { _id: 1, name: 'Faith' },
      { _id: 2, name: 'Jesus' },
      { _id: 3, name: 'Father' },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDb();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipPageAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, 'i') },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case 'popular':
        sortOptions = { questions: -1 };
        break;
      case 'recent':
        sortOptions = { createAt: -1 };
        break;
      case 'name':
        sortOptions = { name: 1 };
        break;
      case 'old':
        sortOptions = { createdAt: 1 };
      default:
        break;
    }

    const totalTags = await Tag.countDocuments(query);
    const tags = await Tag.find(query)
      .skip(skipPageAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const nextPage = totalTags > skipPageAmount + tags.length;

    console.log(page);
    return { tags, nextPage };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuesitonsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDb();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipPageAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createAt: -1 },
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name avatar' },
      ],
    });

    if (!tag) {
      throw new Error('Tag not found');
    }

    const questions = tag.questions;
    const nextPage = tag.questions.length > pageSize;
    return { tagTitle: tag.name, questions, nextPage };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    connectToDb();

    const popularTags = await Tag.aggregate([
      {
        $project: { name: 1, numberOfPosts: { $size: '$questions' } },
      },
      {
        $sort: { numberOfPosts: -1 },
      },
      {
        $limit: 6,
      },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
