import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/:id', function(req, res, next) {
const productId = req.params.id;

    Product.findById(productId)
        .then((product1) => {
            res.render('product', { product1, message: '',

                user: (req.session.user === undefined ? "" : req.session.user)});
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });

});
export default router;