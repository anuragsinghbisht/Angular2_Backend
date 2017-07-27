import mongoose from 'mongoose';
import category from '../schema/category.schema';

const Category = mongoose.model('Category', category);

export default Category;
