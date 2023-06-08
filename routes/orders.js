import { Router } from 'express';

import users from '../models/users.js';
import Order from '../models/order.js';
import user_functions from "../controllers/user.js"

const router = Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());

// Get all orders
router.get('/', user_functions.get_order_item);



// Create a new order
router.post('/', user_functions.create_order);


export default router;