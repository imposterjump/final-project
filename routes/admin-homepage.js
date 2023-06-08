import { Router } from 'express';
var router = Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());
import admin_functions from "../controllers/admin.js"
import { google } from 'googleapis';

router.use((req, res, next) => {
    console.log(req.session.user.type);
    if (req.session.user !== undefined && req.session.user.type == 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});



router.use((req, res, next) => {
    console.log(req.session.user.type);
    if (req.session.user !== undefined && req.session.user.type == 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});








router.get('/', admin_functions.get_admin_home_page);

export default router;