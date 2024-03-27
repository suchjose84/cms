const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    description: {
      type: String
    },
    url: {
        type: String
    }
    
}, {
    versionKey: false,
    collection: 'documents' // Specify the custom collection name here
});

module.exports = mongoose.model('Document', documentSchema);
