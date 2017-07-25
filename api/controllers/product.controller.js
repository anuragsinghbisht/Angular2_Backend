import Exercise from '../../database/models/exercise.model';
import Product from '../../database/models/product.model';

export class ProductController {
  getExercise(req, res) {
    Exercise.find({}).populate('rows').exec((err, exercise) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(exercise);
      }
    });
  }

  createExercise(req, res) {
    const exercise = new Exercise({
      title: req.body.title,
      description: req.body.description,
    });
    exercise.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json({
          message: 'Exercise created successfully',
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
      _creator: req.params.exercise_id,
    });
    product.save((err) => {
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
              message: 'Product created successfully',
            });
          }
        });
      }
    });
  }

  getProduct(req, res) {
    Product.find({}).populate('_creator').exec((err, product) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(product);
      }
    });
  }
}
