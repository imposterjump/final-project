import { Router } from 'express';
import bcrypt from "bcrypt";
var router = Router();

router.get('/', function(req, res, next) {
    let mypassword = bcrypt.hashSync('123456', SALT_ROUNDS)

    let checkpass = '123456';
    if (mypassword == checkpass) {
        console.log("password is correct ");
    } else {
        console.log("password is incorrect ");
    }

    res.render('HomePage');
});

export default router;