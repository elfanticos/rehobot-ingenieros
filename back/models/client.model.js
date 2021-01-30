'use strict'

const model = {};

model.insert = (name, ruc, address, projects, personRegister) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.client_insert($1, $2, $3, $4, $5::INTEGER[]) res`;
        sql = pgpromise.as.format(sql, [name, ruc, address, personRegister, projects]);
        dbp.one(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.list = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM client ORDER BY name`;
        dbp.any(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

module.exports = model;