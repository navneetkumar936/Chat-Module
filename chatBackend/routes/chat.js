const express = require('express');
const router = express.Router();
var chatController = require('../controllers/chat');

router.get('/search', chatController.search);

module.exports = router;
