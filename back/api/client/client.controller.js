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
    const response = await clientService.list();
    res.status(200).send(response);
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.insert = async(req, res) => {
    try {
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
    res.status(200).send({ msj: 'Funciona update' });
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.delete = async(req, res) => {
    res.status(200).send({ msj: 'Funciona delete' });
}

module.exports = controller;