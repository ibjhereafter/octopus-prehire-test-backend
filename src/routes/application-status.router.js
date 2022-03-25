const express = require('express');
const applicationStatus = express.Router();

applicationStatus.get('/status', (req, res) => {
    try {
        return res.send('Application is up and running!');
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
})

module.exports = applicationStatus;