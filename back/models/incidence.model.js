'use strict'

const model = {};

model.insert = (name, duration, address, clients, personRegister) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.project_insert($1, $2, $3, $4::INTEGER[], $5) res`;
        sql = pgpromise.as.format(sql, [name, duration, address, clients, personRegister]);
        dbp.one(sql).then(data => {
            if (data.res.status) return reject(data.res);
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.update = (name, duration, address, clients, personRegister, projectId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.project_update($1, $2, $3, $4::INTEGER[], $5, $6) res`;
        sql = pgpromise.as.format(sql, [name, duration, address, clients, personRegister, projectId]);
        console.log(sql);
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
               mxp.date_register,
               TO_CHAR(mxp.date_register, 'DD/MM/YYYY HH:MI:SS pm') AS date_register_format,
               mxp.description,
               mxp.solution
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

model.delete = (projectId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.project_delete($1) res`;
        sql = pgpromise.as.format(sql, [projectId]);
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