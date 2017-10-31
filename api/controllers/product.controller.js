import Exercise from '../../database/models/exercise.model';
import Product from '../../database/models/product.model';
import Category from '../../database/models/category.model';

export class ProductController {
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
          message: 'Exercise created'
        });
      }
    });
  }
  getExercise(req, res) {
    Exercise.find({}).populate('rows').exec((err, exercise) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if(exercise.length) {
          res.json({
            id: exercise[0]._id,
            title: exercise[0].title,
            description: exercise[0].description
          });
        } else {
          res.json(exercise);
        }
      }
    });
  }
  createProduct(req, res) {
    Exercise.find({}, (err, exercise) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const product = new Product({
          category: req.body.category,
          title: req.body.title,
          url: req.body.url,
          description: req.body.description,
          imageHref: req.body.imageHref,
          _creator: exercise.length ? exercise[0]._id: ''
        });
        exercise[0].rows.push(product);
        exercise[0].save();
        product.save(err => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).json({ message: 'Product Created successfully'});
          }
        });
      }
    });
  }

  getProducts(req, res) {
    let searchObj = {};
    if (req.params.category) {
      searchObj.category = req.params.category;
    }
    if (req.params.productId) {
      searchObj._id = req.params.productId;
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
    Exercise.find({}, (err, exercise) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const category = new Category({
          categoryName: req.body.category,
          _creator: exercise.length ? exercise[0]._id : ''
        });
        exercise[0].categories.push(category);
        exercise[0].save();
        category.save(err => {
          if (err) {
            res.status(500).send(err);
          } else {
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
