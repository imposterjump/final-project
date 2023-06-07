import { Router } from 'express';
var router = Router();
import product from '../models/Product.js';

router.get('/', function(req, res, next) {


    res.render('homepage', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post('/search', function(req, res, next) {

    const s = req.body.search_bar;
    console.log(s);
    product.find({ itemName: { $regex: s, $options: "i" }, description: { $regex: s, $options: "i" } })
        .then(result => {
            console.log(result);

            res.render('homepage', { user: (req.session.user === undefined ? "" : req.session.user) });




        })
        .catch(err => {
            console.log(err);
        });



})

export default router;