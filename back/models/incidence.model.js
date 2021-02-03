'use strict'

const model = {};

model.insert = (project, description, state, solution, dateResponse, personRegister) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.incidence_insert($1, $2, $3, $4, $5, $6) res`;
        sql = pgpromise.as.format(sql, [project, description, state, dateResponse, solution, personRegister]);
        dbp.one(sql).then(data => {
            if (data.res.status) return reject(data.res);
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.update = (project, description, state, solution, dateResponse, personRegister, incidenceId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.incidence_update($1, $2, $3, $4, $5, $6, $7) res`;
        sql = pgpromise.as.format(sql, [project, description, state, dateResponse, solution, personRegister, incidenceId]);
        dbp.one(sql).then(data => {
            if (data.res.status) return reject(data.res);
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.list = (projectId, dateRegister) => {
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT p.name AS project_name,
               p.project_id,
               mxp.date_register,
               TO_CHAR(mxp.date_register, 'DD/MM/YYYY') AS date_register_format,
               TO_CHAR(mxp.date_response, 'DD/MM/YYYY') AS date_response_format,
               mxp.monitoring_x_project_id,
               mxp.description,
               mxp.solution,
               mxp.state,
               mxp.date_response
          FROM monitoring_x_project mxp
               INNER JOIN project_x_client pxc
                       ON pxc.project_x_client_id = mxp._project_x_client_id
               INNER JOIN project p
                       ON p.project_id = pxc._project_id
                      AND p.project_id = COALESCE($1, p.project_id)
         WHERE mxp.type = 'INCID'
           AND mxp.date_register = COALESCE($2, mxp.date_register)`;
        sql = pgpromise.as.format(sql, [projectId, dateRegister]);
        dbp.any(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.delete = (incidenceId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.incidence_delete($1) res`;
        sql = pgpromise.as.format(sql, [incidenceId]);
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