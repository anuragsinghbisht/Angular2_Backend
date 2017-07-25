import { Schema } from 'mongoose';

const exercise = new Schema({
  title: String,
  description: String,
  rows: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

export default exercise;
