import { Router } from 'express';
import products from '../models/Product.js';
import users from '../models/users.js';
import Order from '../models/order.js';
import OrderItem from '../models/order-item.js';
import user_functions from "../controllers/user.js"

const router = Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());
router.post('/checkout', user_functions.shippingform_checkout);


export default router;