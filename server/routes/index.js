const routes = require('express').Router();
const documents = require('./documents');
const contacts = require('./contacts');
const messages = require('./messages');

routes.use('/', documents);
routes.use('/', contacts);
routes.use('/', messages);


module.exports = routes;
