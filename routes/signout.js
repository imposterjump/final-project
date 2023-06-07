import { Router } from 'express';
var router = Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());

router.get('/', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});
export default router;