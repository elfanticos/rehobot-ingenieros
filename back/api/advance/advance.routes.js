const express    = require('express');
const router     = express.Router();
const controller = require('./advance.controller');

router
    .post('/insert', controller.insert)

module.exports = router;
