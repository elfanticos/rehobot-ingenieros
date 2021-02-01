'use strict'
const comboModel = require('../models/combo.model');

const service = {};

service.projects = async() => {
    return await comboModel.projects();
}

service.clients = async() => {
    return await comboModel.clients();
}

module.exports = service;