'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    path = require('path');


// Initial app
const app = express();

// Middlewares
app
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cors())

const r_client = require('./api/client/client.routes');

app
    .use('/api/client', r_client)

// configurations
app.set('port', process.env.PORT || 3000);
// require('./configurations/constants');
// require('./configurations/authenticated');
// require('./configurations/interceptor');


// File Static
// app
//     .use('/public/', express.static('public', {redirect: false}))
//     .use('/', express.static('dist', {redirect : false}))
//     .get('/', (req, res, next) => {
//         res.sendFile(path.resolve('dist/index.html'));
//     })



module.exports = app;