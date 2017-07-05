import mongoose from 'mongoose';
import product from '../schema/product.schema';

const Product = mongoose.model('Product', product)

export default Product;
