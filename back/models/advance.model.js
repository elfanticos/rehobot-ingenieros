'use strict'

const model = {};

model.insert = (project, description, personRegister) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.advance_insert($1, $2, $3) res`;
        sql = pgpromise.as.format(sql, [project, description, personRegister]);
        dbp.one(sql).then(data => {
            if (data.res.status) return reject(data.res);
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

module.exports = model;