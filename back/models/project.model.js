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

model.list = () => {
    return new Promise((resolve, reject) => {
        let sql = `
        WITH list_project AS (
            SELECT p.*,
                   JSONB_AGG(JSONB_BUILD_OBJECT('client_id', c.client_id, 'name', c.name)) AS clients_pre,
                   ARRAY_AGG(c.name) AS clients_name_pre
              FROM project p
                    LEFT JOIN project_x_client pxc
                          ON pxc._project_id = p.project_id
                   LEFT JOIN client c
                          ON c.client_id = _client_id
             GROUP BY p.project_id, p.name, p.address, p.duration, p.person_id_register, p.date_register
             ORDER BY name
            )
            SELECT project_id,
                   name,
                   address,
                   duration,
                   person_id_register,
                   date_register,
                   CASE WHEN (ARRAY_LENGTH(array_remove(clients_name_pre, null),1)) > 0 THEN clients_pre ELSE NULL END AS clients
              FROM list_project`;
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