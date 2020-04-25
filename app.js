const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const Router = require('./router/PhoneGameRouter');
app.use(Router);

module.exports = app;