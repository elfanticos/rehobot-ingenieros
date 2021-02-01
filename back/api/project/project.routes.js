const express    = require('express');
const router     = express.Router();
const controller = require('./project.controller');

router
    .get('/list', controller.list)
    .post('/insert', controller.insert)
    .put('/update/:id', controller.update)
    .delete('/delete/:id', controller.delete)

module.exports = router;
