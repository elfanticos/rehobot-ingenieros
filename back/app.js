'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');


global.jwt = require('jwt-simple');
global.JWT_KEY = 'secret_server_key_rohobot';

// Initial app
const app = express();

// Middlewares
app
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cors())

const r_client = require('./api/client/client.routes');
const r_combo = require('./api/combo/combo.routes');
const r_project = require('./api/project/project.routes');
const r_incidence = require('./api/incidence/incidence.routes');
const r_advance = require('./api/advance/advance.routes');
const r_user = require('./api/user/user.routes');
const r_oauth = require('./api/oauth/oauth.routes');

app
    .use('/api/client', r_client)
    .use('/api/combo', r_combo)
    .use('/api/project', r_project)
    .use('/api/incidence', r_incidence)
    .use('/api/advance', r_advance)
    .use('/api/user', r_user)
    .use('/api/oauth', r_oauth)

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