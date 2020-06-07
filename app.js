const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'Secret Key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge : 60 * 1000 } // 1분
}));

const Router = require('./router/PhoneGameRouter');
app.use(Router);

module.exports = app;