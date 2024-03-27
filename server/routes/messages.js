var express = require('express');
var router = express.Router();
const messageController = require('../controllers/messageController');


// Route to get the list of messages
router.get('/messages', messageController.getAllMessages);
router.post('/messages', messageController.addMessage);

module.exports = router;