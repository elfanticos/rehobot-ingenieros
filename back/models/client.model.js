'use strict'

const model = {};

model.insert = (name, ruc, address, projects) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.client_insert($1, $2, $3, $4) res`;
        sql = pgpromise.as.format(sql, [name, ruc, address, projects]);
        dbp.one(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

module.exports = model;