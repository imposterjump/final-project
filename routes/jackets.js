import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();
import bodyParser from 'body-parser';
import index_functions from "../controllers/index.js"
router.use(bodyParser.json());

router.get('/', index_functions.get_jackets_page);

export default router;