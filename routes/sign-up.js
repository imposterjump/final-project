import { Router } from 'express';
var router = Router();
import users from "../models/users.js"
import bcrypt from "bcrypt";
import pkg from 'url/util.js';
const { isNullOrUndefined } = pkg;
import bodyParser from 'body-parser';
router.use(bodyParser.json());
import index_functions from "../controllers/index.js"


const SALT_ROUNDS = 10;
router.post('/checkUN', index_functions.ajax_check_username);

router.get('/', index_functions.get_sign_up_page);

// create a user or sign up 
router.post('/', index_functions.user_signup);


export default router;