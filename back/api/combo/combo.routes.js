const express    = require('express');
const router     = express.Router();
const controller = require('./combo.controller');

router
    .get('/projects', controller.projects)

module.exports = router;
