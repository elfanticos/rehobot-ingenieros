const express    = require('express');
const router     = express.Router();
const controller = require('./combo.controller');

router
    .get('/projects', controller.projects)
    .get('/clients', controller.clients)

module.exports = router;
