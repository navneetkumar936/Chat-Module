const express = require('express');
const router = express.Router();
var userController = require('../controllers/user');

router.post('/register', userController.register);

router.get('/verifyUser/:tokenId', userController.verifyUser);

router.post('/resendVerify', userController.resendVerify);

router.post('/forgotPassword', userController.forgotPassword);

module.exports = router;