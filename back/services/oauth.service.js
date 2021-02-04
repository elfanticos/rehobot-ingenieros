'use strict'
const oauthModel = require('../models/oauth.model');

const service = {};

/**
 * 
 * @param {String} user 
 * @param {String} password 
 */
service.login = async(user, password) => {
    const inputs = await oauthModel.login(user, password);
    const token = global.jwt.encode(inputs, global.JWT_KEY);
    return {...inputs, token}
}

module.exports = service;