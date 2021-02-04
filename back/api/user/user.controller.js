'use strict'
const express = require('express');
const userService = require('../../services/user.service');

const controller = {};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
controller.list = async(req, res) => {
    try {
        const response = await userService.list();
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

        const { user, password, role, active, full_name, description } = req.body;

        if (!full_name || !role) {
            throw { status: 400, msg: 'ANP' };
        }

        const response = await userService.insert(user, password, role, active, full_name, description);

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
        const { user, password, role, active, full_name, description } = req.body;

        if (!full_name || !role) {
            throw { status: 400, msg: 'ANP' };
        }

        const response = await userService.update(user, password, role, active, full_name, description, id);

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

        const response = await userService.delete(id);

        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error);
    }
}

module.exports = controller;