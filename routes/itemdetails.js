import { Router } from 'express';
import Product from '../models/Product.js';
var router = Router();
router.get('/:id', (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            res.render('item-details', { product });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}); 
export default router;