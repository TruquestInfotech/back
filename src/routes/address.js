const express = require('express');
const {  userMiddleware, requireSignIn } = require('../common-middleware');
const { addAddress, getAddress, getSelectedAddressById } = require('../controllers/address');

const router = express.Router();



router.post('/user/address/create', requireSignIn, userMiddleware, addAddress);
router.get('/user/getaddress', requireSignIn, userMiddleware, getAddress);
router.get("/getSelectedAddress/:_id",requireSignIn, userMiddleware, getSelectedAddressById);
module.exports = router;