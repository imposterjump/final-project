import { Router } from 'express';
var router = Router();
import bcrypt from "bcrypt";
import pkg from 'url/util.js';
const { isNullOrUndefined } = pkg;
import admin_functions from "../controllers/admin.js"
import bodyParser from 'body-parser';
router.use(bodyParser.json());
import users from "../models/users.js"


router.use((req, res, next) => {
    console.log(req.session.user.type);
    if (req.session.user !== undefined && req.session.user.type == "admin") {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});

router.get('/', admin_functions.get_admin_user_page);
router.post('/search', admin_functions.admin_user_search);
router.post("/edit/:id", admin_functions.admin_edit_user_infos);
router.post('/delete/:username', admin_functions.delete_user);
router.post('/adduser', admin_functions.admin_add_user);

export default router;