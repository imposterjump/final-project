import { Router } from 'express';

import users from '../models/users.js';
import Order from '../models/order.js';
import user_functions from "../controllers/user.js"

const router = Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());

// Get all orders
router.get('/', //user_functions.get_order_item
function(req, res, next) {

    Order.find({usernamee : req.session.user.username })
        .then(result => {
            console.log(result);
            res.render('ordersdisplay', {
                Order: result,
                TITLE: 'ORDER DISPLAY PAGE',
                message: '',

                user: (req.session.user === undefined ? "" : req.session.user)



            });
        })
        .catch(err => {
            console.log(err);
        });


});



// Create a new order
router.post('/', user_functions.create_order);


export default router;