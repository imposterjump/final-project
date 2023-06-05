import { Router } from 'express';
var router = Router();

router.get('/', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});
export default router;