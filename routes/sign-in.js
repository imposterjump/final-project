import { Router } from 'express';
var router = Router();
import bcrypt from "bcrypt";
import pkg from 'url/util.js';
const { isNullOrUndefined } = pkg;
import users from "../models/users.js"



const SALT_ROUNDS = 10;

router.get('/', function(req, res, next) {
    res.render('signin', {
        message: ""
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


                bcrypt.compare(req.body.password, result.password, (err, result) => {
                    if (err || !result) {
                        console.log("wrong pass ");

                        res.render('signin', {
                            message: "sorry this password is incorrect please try agaim "
                        });
                        return false;




                    } else {
                        console.log("correct password and type = " + mytype);
                        if (mytype == 'user') {
                            res.render('HomePage');
                            return true;
                        } else if (mytype == 'admin') {
                            res.redirect('/admin-homepage');
                            return true;

                        }


                    }




                });






            } else {
                console.log(" i am not null");
                res.render('signin', {

                    message: "sorry this username doesnt exist please try agaim "
                });

            }





        })
        .catch(err => {
            console.log(err);
        });


});

export default router;