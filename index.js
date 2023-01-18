const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const { generateImage } = require('./controllers/openaiController');

const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));

const serverless = require('serverless-http');
const handler = serverless(app);

module.exports.app = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return handler(event, context, callback);
};
