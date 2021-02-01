'use strict'
const projectModel = require('../models/project.model');
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
    return await projectModel.insert(name, duration, address, clients, personRegister);
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
    return await projectModel.update(name, duration, address, clients, personRegister, projectId);
}

/**
 * @returns {Object[]}
 */
service.list = async() => {
    return await projectModel.list();
}

/**
 * 
 * @param {Number} projectId 
 */
service.delete = async(projectId) => {
    return await projectModel.delete(projectId);
}

module.exports = service;