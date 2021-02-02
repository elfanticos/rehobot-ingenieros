'use strict'
const express = require('express');
const incidenceService = require('../../services/incidence.service');

const controller = {};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.list = async(req, res) => {
    try {
        const projectId = req.query.projectId || null;
        const dateRegister = req.query.dateRegister || null;
        const response = await incidenceService.list(projectId, dateRegister);
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
controller.insert = async(req, res) => {
    try {

        req.body.personRegister = 1;

        const { name, duration, address, clients, personRegister } = req.body;

        if (!name || !duration || !address || !personRegister) {
            throw { status: 400, msg: 'ANP' };
        }

        const response = await incidenceService.insert(name, duration, address, clients, personRegister);

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
controller.update = async(req, res) => {
    try {

        req.body.personRegister = 1;

        const { id } = req.params;
        const { name, duration, address, clients, personRegister } = req.body;

        if (!name || !duration || !address || !personRegister) {
            throw { status: 400, msg: 'ANP' };
        }

        const response = await incidenceService.update(name, duration, address, clients, personRegister, id);

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
controller.delete = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) throw { status: 400, msg: 'ANP' };

        const response = await incidenceService.delete(id);

        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error);
    }
}

module.exports = controller;