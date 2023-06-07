import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());
import index_functions from "../controllers/index.js"

router.get('/:id', index_functions.get_product);
export default router;