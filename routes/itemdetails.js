import { Router } from 'express';
import Product from '../models/Product.js';
var router = Router();
router.get('/:id', (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            res.render('item-details', { product, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
});
export default router;