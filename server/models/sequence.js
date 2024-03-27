const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxDocumentId: {
    type: Number
  },
  maxMessageId: {
    type: Number
  },
  maxContactId: {
    type: Number
  }
    
}, {
    versionKey: false,
    collection: 'sequences' // Specify the custom collection name here
});

module.exports = mongoose.model('Sequence', sequenceSchema);