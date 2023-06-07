import { Router } from 'express';
var router = Router();

import user_functions from "../controllers/user.js"
import bodyParser from 'body-parser';
router.use(bodyParser.json());



router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.type == "user") {
        next();
    } else {
        res.render('err', { err: 'You must be logged in ', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});
router.get('/', user_functions.display_user_profile);

router.post("/edit", user_functions.edit_user_profile);

router.post("/editpassword", user_functions.edit_user_password);
export default router;