import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {


    res.render('HomePage');
});

export default router;