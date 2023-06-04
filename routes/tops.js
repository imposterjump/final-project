import { Router } from 'express';
import Product from '../models/Product.js';
var router = Router();

router.get('/', function(req, res, next) {

    Product.find({ type: 'tops' })
        .then(result => {
            console.log(result);
            res.render('tops', {
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