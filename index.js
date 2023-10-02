const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/mongoose');

// Configure middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/index'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});