'use strict'
const express = require('express');
const clientService = require('../../services/client.service');

const controller = {};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.list = async(req, res) => {
    try {
        const response = await clientService.list();
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

        const { name, ruc, address, projects, personRegister } = req.body;

        if (!name || !ruc || !address || !personRegister) {
            throw { status: 400, msg: 'ANP' };
        }

        const response = await clientService.insert(name, ruc, address, projects, personRegister);

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
        const { name, ruc, address, projects, personRegister } = req.body;

        if (!name || !ruc || !address || !personRegister) {
            throw { status: 400, msg: 'ANP' };
        }

        const response = await clientService.update(name, ruc, address, projects, personRegister, id);

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

        const response = await clientService.delete(id);

        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error);
    }
}

module.exports = controller;