import express from 'express';
import { ProductController } from '../controllers/product.controller';

const router = express.Router();
const ProductCtrl = new ProductController();

router.route('/').get(ProductCtrl.getExercise).post(ProductCtrl.createExercise);

router
  .route('/:exercise_id/category')
  .get(ProductCtrl.getCategories)
  .post(ProductCtrl.createCategory);

router
  .route('/:exercise_id/product')
  .get(ProductCtrl.getProduct)
  .post(ProductCtrl.createProduct);

router
  .route('/:exercise_id/:category/product')
  .get(ProductCtrl.getProduct)
  .post(ProductCtrl.createProduct);

export default router;
