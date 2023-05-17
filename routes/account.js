import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {
    res.send('account');
});

export default router;