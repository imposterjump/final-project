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
router.get('/', function(req, res, next) {

    Product.find()
        .then(result => {
            console.log(result);
            res.render('Jackets', {
                Product: result,
                TITLE: 'PRODUCT PAGE',
                message: '',
                user: (req.session.user === undefined ? "" : req.session.user)



            });
        })
        .catch(err => {
            console.log(err);
        });


});
export default router;