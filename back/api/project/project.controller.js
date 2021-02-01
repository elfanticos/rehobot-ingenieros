'use strict'
const express = require('express');
const projectService = require('../../services/project.service');

const controller = {};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.list = async(req, res) => {
    try {
        const response = await projectService.list();
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

        const response = await projectService.insert(name, duration, address, clients, personRegister);

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

        const response = await projectService.update(name, duration, address, clients, personRegister, id);

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

        const response = await projectService.delete(id);

        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error);
    }
}

module.exports = controller;