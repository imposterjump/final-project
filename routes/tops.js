import { Router } from 'express';
import Product from '../models/Product.js';
var router = Router();
import bodyParser from 'body-parser';
import index_functions from "../controllers/index.js"
router.use(bodyParser.json());
router.get('/', index_functions.get_tops_page);
export default router;