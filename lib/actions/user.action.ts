'use server';

import { connectToDb } from '../db/mongoose';
import User from '../db/models/user.model';

export async function getUserById(params: any) {
  try {
    connectToDb();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
