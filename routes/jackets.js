import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { createRequire } from 'module';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('jackets', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
});

router.get('/', (req, res) => {
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