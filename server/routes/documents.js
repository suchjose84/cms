var express = require('express');
var router = express.Router();
const documentController = require('../controllers/documentController');
const path = require('path');


// Route to get the list of documents
router.get('/documents', documentController.getAllDocuments);
router.post('/documents', documentController.addDocument);
router.put('/documents/:id', documentController.updateDocument);
router.delete("/documents/:id", documentController.deleteDocument);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

module.exports = router;