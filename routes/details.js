import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { createRequire } from 'module';
import Product from '../models/Product.js';
const router = express.Router();

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.type === 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});


router.get('/:id', (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            res.render('details', { product, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
});
router.delete('/:id', (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then(() => {
            res.json({ mylink: '/vproducts', user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
});


export default router;