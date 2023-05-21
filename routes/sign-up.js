import { Router } from 'express';
var router = Router();
import users from "../models/users.js"

router.get('/', function(req, res, next) {
    res.render('signup', {
        TITLE: 'SIGNUP PAGE'

    });
});

// create a user or sign up 
router.post('/', async(req, res) => {
    const default_type = "user";

    let un = req.body.username;
    let pw = req.body.password;
    let pn = req.body.phone;
    let em = req.body.email;
    console.log("infos : pn + pw + un + em");

    const user = await users.create({
        username: un,
        password: pw,
        type: default_type,
        email: em,
        phone_number: pn
    })
    user.save()
        .then(result => {
            console.log(result + "added user ");
            res.render('/');
        })
        .catch(err => {
            console.log(err);

        });

});


export default router;