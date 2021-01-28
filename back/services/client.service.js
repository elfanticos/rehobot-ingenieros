'use strict'
const clientModel = require('../models/client.model');
const service = {};

service.insert = async (name, ruc, address, projects) => {
    
    return clientModel.insert(name, ruc, address, projects);
}

module.exports = service;