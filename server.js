// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express(); // Create an instance of express

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

/****************ROUTES HERE*************/

app.use('/', require('./server/routes/index'));


// Serve static files
app.use(express.static(path.join(__dirname, 'dist/cms')));

// // Use routes
// app.use('/', require('./server/routes'));

// // Handle non-defined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});


// import the routing file to handle the default (index) route
// var index = require('./server/routes/index');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ...
// const messageRoutes = require('./server/routes/messages');
// const contactRoutes = require('./server/routes/contacts');
// const documentRoutes = require('./server/routes/documents');

// Tell express to map the default route ('/') to the index route
// app.use('/', require('./server/routes/index'));


// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
// app.use('/messages', messageRoutes);
// app.use('/contacts', contactRoutes);
// app.use('/documents', documentRoutes);










// Define port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Database connection
const db = require('./server/models');
db.mongoose.connect(db.url)
  .then(() => console.log('Connected to the database'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Terminate the application on database connection error
  });
