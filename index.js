const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fetch = require('node-fetch');
const { generateImage } = require('./controllers/openaiController');

const app = express();

// Enable body parser

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/generateimage', async (req, res) => {
    const {prompt} = req.body;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({prompt, n:3}),
    };

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options);
        const json = await response.json();

        res.status(200).json({
            success: true,
            data: json.data.map(image => image.url)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports.app = async (event, context, callback) => {
    const handler = serverless(app);
    return handler(event, context, callback);
};
