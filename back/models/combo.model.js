'use strict'

const model = {};

model.projects = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT project_id, name FROM project ORDER BY name`;
        dbp.any(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

module.exports = model;