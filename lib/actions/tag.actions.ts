'use server';

import Tag from '../db/models/tag.model';
import User from '../db/models/user.model';
import { connectToDb } from '../db/mongoose';
import { GetActivityTagsParams, GetAllTagsParams } from './shared.types';

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

    const tags = await Tag.find({});

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
