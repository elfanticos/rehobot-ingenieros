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
    try {
        const response = await comboService.projects();
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error);
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.clients = async(req, res) => {
    try {
        const response = await comboService.clients();
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error);
    }
}

module.exports = controller;