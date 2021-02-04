'use strict'
const express = require('express');
const oauthService = require('../../services/oauth.service');

const controller = {};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.login = async(req, res) => {
    try {
        const {user, password} = req.body;
        const response = await oauthService.login(user, password);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error);
    }
}

module.exports = controller;