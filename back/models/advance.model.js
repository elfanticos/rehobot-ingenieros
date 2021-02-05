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

model.dataPdf = (projectId) => {
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT CASE WHEN "type" = 'INCID'  THEN 'INCIDENCIA' ELSE 'AVANCE' END AS "type",
               description,
               solution,
               TO_CHAR(date_register, 'DD/MM/YYYY') AS date_register,
               TO_CHAR(date_response, 'DD/MM/YYYY') AS date_response
          FROM monitoring_x_project
         WHERE _project_id = $1
        `;
        sql = pgpromise.as.format(sql, [projectId]);
        dbp.any(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

module.exports = model;