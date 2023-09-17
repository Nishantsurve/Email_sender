const router = require('express').Router();
const {singup ,getbill} = require('../controller/appController.js')

router.post('/user/signup' , singup);
router.post('/product/getbill', getbill);

module.exports = router;
