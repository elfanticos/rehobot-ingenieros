'use strict'
const incidenceModel = require('../models/incidence.model');
const helper = require('../helpers/helper');

const service = {};

/**
 * 
 * @param {Number} project 
 * @param {String} description 
 * @param {String} state 
 * @param {String} solution 
 * @param {String} dateResponse 
 * @param {Number} personRegister 
 */
service.insert = async(project, description, state, solution, dateResponse, personRegister) => {
    return await incidenceModel.insert(project, description, state, solution, dateResponse, personRegister);
}

/**
 * 
 * @param {Number} project 
 * @param {String} description 
 * @param {String} state 
 * @param {String} solution 
 * @param {String} dateResponse 
 * @param {Number} personRegister 
 * @param {Number} incidenceId 
 */
service.update = async(project, description, state, solution, dateResponse, personRegister, incidenceId) => {
    return await incidenceModel.update(project, description, state, solution, dateResponse, personRegister, incidenceId);
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
 * @param {Number} incidenceId 
 */
service.delete = async(incidenceId) => {
    return await incidenceModel.delete(incidenceId);
}

module.exports = service;