import express from 'express';
import Product from '../models/Product.js';
import path from "path";
import logger from "morgan";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
const router = express.Router();

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
        .then((product) => {
            res.render('edit', { product });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
});


export default router;