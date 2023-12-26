import { model, models, Schema, Document } from 'mongoose';

export interface IDisplayAction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId;
  createAt: Date;
}

const DisplayActionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createAt: { type: Date, default: Date.now },
});

const DisplayAction =
  models.DisplayAction || model('DisplayAction', DisplayActionSchema);

export default DisplayAction;
