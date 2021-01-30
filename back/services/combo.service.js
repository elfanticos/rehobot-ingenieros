'use strict'
const comboModel = require('../models/combo.model');

const service = {};

service.projects = async() => {
    return await comboModel.projects();
}

module.exports = service;