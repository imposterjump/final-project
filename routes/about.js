import { Router } from 'express';
const router = Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());
import index_functions from "../controllers/index.js"

router.get('/', index_functions.get_about_page);
export default router;