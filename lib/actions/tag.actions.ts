'use server';

import User from '../db/models/user.model';
import { connectToDb } from '../db/mongoose';
import { GetActivityTagsParams } from './shared.types';

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
