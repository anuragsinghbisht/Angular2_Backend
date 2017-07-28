import express from 'express';
import { ProductController } from '../controllers/product.controller';

const router = express.Router();
const ProductCtrl = new ProductController();

router.route('/').get(ProductCtrl.getExercise).post(ProductCtrl.createExercise);

router
  .route('/category')
  .get(ProductCtrl.getCategories)
  .post(ProductCtrl.createCategory);

router
  .route('/product')
  .get(ProductCtrl.getProducts)
  .post(ProductCtrl.createProduct);

router
  .route('/:category/product')
  .get(ProductCtrl.getProducts)
  .post(ProductCtrl.createProduct);

router
  .route('/:category/product/:productId')
  .get(ProductCtrl.getProducts);

export default router;
