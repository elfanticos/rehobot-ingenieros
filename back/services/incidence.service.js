'use strict'
const incidenceModel = require('../models/incidence.model');
const helper = require('../helpers/helper');

const service = {};

/**
 * 
 * @param {String} name 
 * @param {String} duration 
 * @param {String} address 
 * @param {Number[]} clients 
 * @param {Number} personRegister 
 */
service.insert = async(name, duration, address, clients, personRegister) => {
    clients = helper.__array_string(clients);
    return await incidenceModel.insert(name, duration, address, clients, personRegister);
}

/**
 * 
 * @param {String} name 
 * @param {String} duration 
 * @param {String} address 
 * @param {Number[]} clients 
 * @param {Number} personRegister 
 * @param {Number} projectId 
 */
service.update = async(name, duration, address, clients, personRegister, projectId) => {
    clients = helper.__array_string(clients);
    return await incidenceModel.update(name, duration, address, clients, personRegister, projectId);
}

/**
 * 
 * @param {Number} projectId 
 * @param {String} dateRegister
 */
service.list = async(projectId, dateRegister) => {
    return await incidenceModel.list(projectId, dateRegister);
}

/**
 * 
 * @param {Number} projectId 
 */
service.delete = async(projectId) => {
    return await incidenceModel.delete(projectId);
}

module.exports = service;