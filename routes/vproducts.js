import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/', (req, res) => {
  Product.find()
    .then((result) => {
      res.render('vproducts', { arrproduct: result });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});
router.get('/details/:id', (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      res.render('details', { product });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

export default router;
