import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDb = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    return console.log('missing mongodn uri');
  }

  if (isConnected) {
    return console.log('Connection online');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'queton',
    });

    isConnected = true;
    console.log('connection established');
  } catch (error) {
    console.log(error);
  }
};
