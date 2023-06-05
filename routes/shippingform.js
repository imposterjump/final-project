import { Router } from 'express';
import Product from '../models/Product.js';
import users from '../models/users.js';
import Order  from '../models/order.js';

const router = Router();
//get shipping form
router.get('/', (req, res) => {
    res.render('shippingform');
});
export default router;
