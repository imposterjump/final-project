import { Router } from 'express';
import user_functions from "../controllers/user.js"

const router = Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());

// checking if he is signed in to access the cart function
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

router.get('/', user_functions.mycart);

router.get("/add/:id", user_functions.addtocart);


router.get("/delete/:id", user_functions.deletefromcart);

export default router;