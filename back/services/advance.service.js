'use strict'
const advanceModel = require('../models/advance.model');

const service = {};

/**
 * 
 * @param {Number} project 
 * @param {String} description
 * @param {Number} personRegister 
 */
service.insert = async(project, description, personRegister) => {
    return await advanceModel.insert(project, description, personRegister);
}

module.exports = service;