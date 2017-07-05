import { Schema } from "mongoose";

const product = new Schema({
  _creator: { type: String, ref: "Exercise" },
  category: String,
  title: String,
  url: String,
  description: String,
  imageHref: String
});

export default product;
