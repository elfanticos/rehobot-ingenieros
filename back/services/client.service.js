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
service.insert = async(name, ruc, address, projects, personRegister) => {
    projects = helper.__array_string(projects);
    return await clientModel.insert(name, ruc, address, projects, personRegister);
}

/**
 * 
 * @param {String} name 
 * @param {String} ruc 
 * @param {String} address 
 * @param {Number[]} projects 
 * @param {Number} personRegister
 * @param {Number} idClient
 * @returns {Object}
 */
service.update = async(name, ruc, address, projects, personRegister, idClient) => {
    projects = helper.__array_string(projects);
    return await clientModel.update(name, ruc, address, projects, personRegister, idClient);
}

/**
 * @returns {Object[]}
 */
service.list = async() => {
    return await clientModel.list();
}

/**
 * 
 * @param {Number} clientId 
 */
service.delete = async(clientId) => {
    return await clientModel.delete(clientId);
}

module.exports = service;