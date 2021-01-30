'use strict'
const express = require('express');
const comboService = require('../../services/combo.service');

const controller = {};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.projects = async(req, res) => {
    const response = await comboService.projects();
    res.status(200).send(response);
}

module.exports = controller;