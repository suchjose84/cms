var express = require('express');
var router = express.Router();
const contactController = require('../controllers/contactController');


// Route to get the list of documents
router.get('/contacts', contactController.getAllContacts);
router.get('/contacts/:id', contactController.getContactById);
router.post('/contacts', contactController.addContact);
router.put('/contacts/:id', contactController.updateContact);
router.delete("/contacts/:id", contactController.deleteContact);

module.exports = router;