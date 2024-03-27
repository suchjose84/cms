const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.contact = require('./contact.js')(mongoose);
db.document = require('./document.js')(mongoose);
db.message = require('./message.js')(mongoose);
db.sequence = require('./sequence.js')(mongoose);

module.exports = db;