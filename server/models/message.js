const mongoose = require('mongoose');

  const messageSchema = mongoose.Schema({
      id: {
        type: String
      },
      subject: {
        type: String
      },
      msgText: {
        type: String
      },
      sender: {
        type: String
      }
    }, {
      versionKey: false,
      collection: 'messages' // Specify the custom collection name here
    });
module.exports = mongoose.model('Message', messageSchema);