import { model, models, Schema, Document } from 'mongoose';

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  follower: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  follower: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createAt: { type: Date, default: Date.now },
});

const TagDb = models.Tag || model('Tag', TagSchema);

export default TagDb;
