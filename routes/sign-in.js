import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {
    res.render('signin');
});

export default router;