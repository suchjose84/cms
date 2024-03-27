const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

module.exports.getAllDocuments = async (req, res, next) => {
  try {
      const documents = await Document.find();
      res.status(200).json(documents);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
  }
};

module.exports.addDocument = async (req, res, next) => {
  try {
      const maxDocumentId = await sequenceGenerator.nextId("documents");
  
      const document = new Document({
          id: maxDocumentId,
          name: req.body.name,
          description: req.body.description,
          url: req.body.url
          
      });
  
      const createdDocument = await document.save();
  
      res.status(201).json({
          message: 'Document added successfully',
          document: createdDocument
      });
  } catch (error) {
      res.status(500).json({
          message: 'An error occurred',
          error: error
      });
  }
};

module.exports.updateDocument = async (req, res, next) => {
    try {
      const document = await Document.findOne({ id: req.params.id });
  
      if (!document) {
        return res.status(404).json({
          message: 'Document not found.',
          error: { document: 'Document not found' }
        });
      }
  
      document.id = req.body.id;
      document.name = req.body.name;
      document.url = req.body.url;
  
      await Document.updateOne({ id: req.params.id }, document);
  
      res.status(204).json({
        message: 'Document updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    }
}

module.exports.deleteDocument = async(req, res, next) => {
    try {
      const document = await Document.findOne({ id: req.params.id });
      if(!document) {
        return res.status(404).json({
          message: 'Document not found',
          error: { document: 'Document not found' }

        });
      }

      await Document.deleteOne({ id: req.params.id });

      res.status(204).json({
        message: "Document deleted successfully"

      });
    } catch(error) {
      res.status(500).json({
        message: 'An error occured',
        error: error

      });
    }
};





