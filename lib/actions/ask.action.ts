'use server';

import { connectToDb } from '../db/mongoose';

export async function askQuestion(params: any) {
  try {
    connectToDb();
  } catch (error) {}
}
