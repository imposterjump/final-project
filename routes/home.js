import { Router } from 'express';
var router = Router();
import product from '../models/Product.js';
import bodyParser from 'body-parser';
router.use(bodyParser.json());
import index_functions from "../controllers/index.js"
router.get('/', index_functions.get_home_page);

router.post('/search', index_functions.search_for_product)

export default router;