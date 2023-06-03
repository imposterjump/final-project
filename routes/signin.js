import { Router } from 'express';
var router = Router();
import bcrypt from 'bcrypt'
import users from "../models/users.js"
import pkg from 'url/util.js';
import { Db } from 'mongodb';
const { isNullOrUndefined } = pkg;



router.get('/', function (req, res, next) {
    res.render('signin');
});


router.post('/', async (req, res) => {



    var userEmail = { email: req.body.email};
     var existingUser = users.findOne(userEmail)
        if(!existingUser)
        {
            res.render('signin')
        }
        else
        {
            res.render('HomePage')
        }
    

        
    });







export default router;