import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {
    res.send('i am here for you ya me3alem akalemak men el home page ');
});

export default router;