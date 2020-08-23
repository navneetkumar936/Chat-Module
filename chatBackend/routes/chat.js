const express = require('express');
const router = express.Router();
var authorization = require('../middlewares/authorization');
var chatController = require('../controllers/chat');

router.get('/search', [authorization()], chatController.search);
router.post('/newMessage', [authorization()], chatController.newMessage);
router.get('/message/:receiverId', [authorization()], chatController.getMessage);

module.exports = router;
