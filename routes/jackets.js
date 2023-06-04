import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/', function(req, res, next) {

    Product.find({ type: 'jackets' })
        .then(result => {
            console.log(result);
            res.render('jackets', {
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