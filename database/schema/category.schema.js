import { Schema } from 'mongoose';

const category = new Schema({
  categoryName: String,
  _creator: { type: String, ref: 'Exercise' }
});

export default category;
