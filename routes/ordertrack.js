import { Router } from 'express';
const router = Router();
import bodyParser from 'body-parser';
import user_functions from "../controllers/user.js"
router.use(bodyParser.json());

router.get('/', user_functions.track_order);
export default router;