import { Router } from 'express';
import Product from '../models/Product.js';
var router = Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());
import index_functions from "../controllers/index.js"


router.get('/:id', index_functions.display_product_details);
export default router;