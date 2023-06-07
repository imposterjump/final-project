import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());
import admin_functions from "../controllers/admin.js"

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.type === 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});


router.get('/', admin_functions.admin_display_all_products);
router.get('/details/:id', admin_functions.admin_item_details);

export default router;