const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const path = require('path');
const routes = require('./router')
const morganMiddleware = require('./middlewares/logger');
const ApiError = require('./util/ApiError');
const { StatusCodes } = require('http-status-codes');
const ErrorHandler = require('./middlewares/error');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Set the port to listen on
const port = 3002;

// Create an instance of the Express application
const app = express();

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Set the Access-Control-Allow-Credentials header to true
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Allow specific headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Allow specific methods
  next();
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true, // Use extended syntax for URL-encoded bodies
}));

// Morgan logging middleware
app.use(morganMiddleware);

// Middleware to parse JSON bodies
app.use(cookieParser());

// Health check route
app.get('/health', (req, res) => res.send({ message: 'ok' }));

// v1 api routes
app.use("/v1", routes); 

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, "Route Not found"));
});

// ERROR HANDLER MIDDLEWARE
app.use(ErrorHandler)

// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Datatys App running on port ${port}.`);
});

// Export the server for testing or other purposes
module.exports = server;
