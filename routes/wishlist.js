import { Router } from 'express';
import Product from '../models/Product.js';
import users from '../models/users.js';
import bodyParser from 'body-parser';
import user_functions from "../controllers/user.js"
import user from '../controllers/user.js';
const router = Router();

router.use(bodyParser.json());
router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.type === "user") {
        next();
    } else {
        res.render('err', {
            err: 'You are not signed in as a user. Please sign in.',
            user: (req.session.user === undefined ? "" : req.session.user)
        });
    }
});

router.get('/', user_functions.display_wishlist);

router.get("/add/:id", user_functions.add_to_wishlist);



router.get("/delete/:id", user_functions.delete_from_wishlist);

export default router;