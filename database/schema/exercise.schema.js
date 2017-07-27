import { Schema } from 'mongoose';

const exercise = new Schema({
  title: String,
  description: String,
  rows: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

export default exercise;
