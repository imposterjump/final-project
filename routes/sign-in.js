import { Router } from 'express';
var router = Router();
import pkg from 'url/util.js';
const { isNullOrUndefined } = pkg;
import bodyParser from 'body-parser';
import index_functions from "../controllers/index.js"
router.use(bodyParser.json());



router.get('/', index_functions.get_sign_in_page);






router.post('/user', index_functions.user_sign_in);

export default router;