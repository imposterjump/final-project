import { Router } from 'express';
var router = Router();
import bcrypt from "bcrypt";
import pkg from 'url/util.js';
const { isNullOrUndefined } = pkg;
import users from "../models/users.js"



const SALT_ROUNDS = 10;

router.get('/', function(req, res, next) {
    res.render('signin', {
        message: "",
        user: (req.session.user === undefined ? "" : req.session.user)
    });
});






router.post('/user', function(req, res, next) {
    let temp_password = req.body.password;
    let query = { username: req.body.username };
    console.log("temp username : " + req.body.username + " temp password : " + temp_password);
    users.findOne(query)
        .then(result => {



            if (result != null) {
                console.log(" i am not null");
                console.log(result);
                let mytype = result.type;
                const me = result;


                bcrypt.compare(req.body.password, result.password, (err, result) => {
                    if (err || !result) {
                        console.log("wrong pass ");

                        res.render('signin', {
                            message: "sorry this password is incorrect please try agaim ",
                            user: (req.session.user === undefined ? "" : req.session.user)
                        });
                        return false;




                    } else {
                        console.log("correct password and type = " + mytype);
                        if (mytype == 'user') {
                            req.session.user = me;
                            res.render('HomePage', { user: (req.session.user === undefined ? "" : req.session.user) });
                            return true;
                        } else if (mytype == 'admin') {
                            req.session.user = me;
                            console.log(req.session.user);
                            users.find()
                                .then(result => {
                                    console.log(result);
                                    res.render('admin_user_controls', {
                                        users: result,
                                        TITLE: 'SIGNUP PAGE',
                                        message: '',
                                        user: (req.session.user === undefined ? "" : req.session.user)



                                    });

                                })
                                .catch(err => {
                                    console.log(err);
                                });

                            return true;

                        }


                    }




                });






            } else {
                console.log(" i am null");
                res.render('signin', {

                    message: "sorry this username doesnt exist please try agaim ",
                    user: (req.session.user === undefined ? "" : req.session.user)
                });

            }





        })
        .catch(err => {
            console.log(err);
        });


});

export default router;