import { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  password?: string;
  email: string;
  bio: string;
  avatar: string;
  location?: string;
  personalPage?: string;
  level: number;
  saved: Schema.Types.ObjectId[];
  joined: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  avatar: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  personalPage: {
    type: String,
  },
  level: {
    type: Number,
    required: true,
    default: 0,
  },
  saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  joined: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model('User', UserSchema);

export default User;
