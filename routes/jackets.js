import { Router } from 'express';
import Product from "../models/Product.js";
var router = Router();

router.get('/', function(req, res, next) {
    res.render('jackets', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
});

export default router;