'use strict'
const express = require('express');
const advanceService = require('../../services/advance.service');

const controller = {};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.insert = async(req, res) => {
    try {

        req.body.personRegister = 1;

        const { project, description, personRegister } = req.body;

        if (!project || !description || !personRegister) {
            throw { status: 400, msg: 'ANP' };
        }

        const response = await advanceService.insert(project, description, personRegister);

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
controller.dataPdf = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) throw { status: 400, msg: 'ANP' };

        const response = await advanceService.dataPdf(id);

        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error);
    }
}

module.exports = controller;