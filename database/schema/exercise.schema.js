import { Schema } from "mongoose";
import product from "./product.schema";

const exercise = new Schema({
  title: String,
  description: String,
  rows: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

export default exercise;
