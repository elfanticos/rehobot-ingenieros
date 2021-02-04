'use strict'

const model = {};

model.login = (user, password) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.login($1, $2) res`;
        sql = pgpromise.as.format(sql, [user, password]);
        dbp.one(sql).then(data => {
            if (data.res.status) return reject(data.res);
            return resolve(data.res);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

module.exports = model;