import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { createRequire } from 'module';
import Product from '../models/Product.js';
const router = express.Router();
import admin_functions from "../controllers/admin.js"
import bodyParser from 'body-parser';
import admin from '../controllers/admin.js';
router.use(bodyParser.json());

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.type === 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});


router.get('/:id', admin_functions.admin_display_product_details);
router.delete('/:id', admin_functions.delete_product);


export default router;