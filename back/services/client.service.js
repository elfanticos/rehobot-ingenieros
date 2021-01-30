'use strict'
const clientModel = require('../models/client.model');
const helper = require('../helpers/helper');

const service = {};

/**
 * 
 * @param {String} name 
 * @param {String} ruc 
 * @param {String} address 
 * @param {Number[]} projects 
 * @param {Number} personRegister
 * @returns {Object}
 */
service.insert = async (name, ruc, address, projects, personRegister) => {
    projects = helper.__array_string(projects);
    return await clientModel.insert(name, ruc, address, projects, personRegister);
}

/**
 * @returns {Object[]}
 */
service.list = async () => {
    return await clientModel.list();
}

module.exports = service;