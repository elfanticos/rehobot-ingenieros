'use strict'
const userModel = require('../models/user.model');

const service = {};

/**
 * 
 * @param {String} user 
 * @param {String} password 
 * @param {Number} role_id 
 * @param {Boolean} active 
 * @param {String} full_name 
 * @param {String} description 
 */
service.insert = async(user, password, role_id, active, full_name, description) => {
    return await userModel.insert(user, password, role_id, active, full_name, description);
}

/**
 * 
 * @param {String} user 
 * @param {String} password 
 * @param {Number} role_id 
 * @param {Boolean} active 
 * @param {String} full_name 
 * @param {String} description 
 * @param {Number} userId 
 */
service.update = async(user, password, role_id, active, full_name, description, userId) => {
    return await userModel.update(user, password, role_id, active, full_name, description, userId);
}

service.list = async() => {
    return await userModel.list();
}

/**
 * 
 * @param {Number} userId 
 */
service.delete = async(userId) => {
    return await userModel.delete(userId);
}

module.exports = service;