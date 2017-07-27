import Exercise from '../../database/models/exercise.model';
import Product from '../../database/models/product.model';
import Category from '../../database/models/category.model';

export class ProductController {
  getExercise(req, res) {
    Exercise.find({}).populate('rows').exec((err, exercise) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({
          id: exercise[0]._id,
          title: exercise[0].title,
          description: exercise[0].description
        });
      }
    });
  }

  createExercise(req, res) {
    const exercise = new Exercise({
      title: req.body.title,
      description: req.body.description
    });
    exercise.save(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json({
          message: 'Exercise created successfully'
        });
      }
    });
  }

  createProduct(req, res) {
    const product = new Product({
      category: req.body.category,
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      imageHref: req.body.imageHref,
      _creator: req.params.exercise_id
    });
    product.save(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        Exercise.findOne({ _id: req.params.exercise_id }, (err, exercise) => {
          if (err) {
            res.status(500).send(err);
          } else {
            exercise.rows.push(product);
            exercise.save();
            res.status(200).json({
              message: 'Product created successfully'
            });
          }
        });
      }
    });
  }

  getProduct(req, res) {
    let searchObj = {};
    if (req.params.category) {
      searchObj.category = req.params.category;
    }
    Product.find(searchObj).populate('_creator').exec((err, product) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(product);
      }
    });
  }

  createCategory(req, res) {
    const category = new Category({
      categoryName: req.body.category,
      _creator: req.params.exercise_id
    });
    category.save(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        Exercise.findOne({ _id: req.params.exercise_id }, (err, exercise) => {
          if (err) {
            res.status(500).send(err);
          } else {
            exercise.categories.push(category);
            exercise.save();
            res.status(200).json({
              message: 'Category created successfully'
            });
          }
        });
      }
    });
  }

  getCategories(req, res) {
    Category.find({}).populate('_creator').exec((err, categories) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(categories);
      }
    });
  }
}
