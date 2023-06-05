import { Router } from 'express';
import products from '../models/Product.js';
import users from '../models/users.js';
import Order from '../models/order.js';
import OrderItem from '../models/order-item.js'

const router = Router();
//get shipping form
router.post('/', (req, res) => {



    res.render('shippingform', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });



});
export default router;