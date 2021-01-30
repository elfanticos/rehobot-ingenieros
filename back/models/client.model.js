'use strict'

const model = {};

model.insert = (name, ruc, address, projects, personRegister) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.client_insert($1, $2, $3, $4, $5::INTEGER[]) res`;
        sql = pgpromise.as.format(sql, [name, ruc, address, personRegister, projects]);
        dbp.one(sql).then(data => {
            if (data.res.status) return reject(data.res);
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.update = (name, ruc, address, projects, personRegister, clientId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.client_update($1, $2, $3, $4, $5::INTEGER[], $6) res`;
        sql = pgpromise.as.format(sql, [name, ruc, address, personRegister, projects, clientId]);
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
        WITH list_client AS (
            SELECT c.*,
                  JSONB_AGG(JSONB_BUILD_OBJECT('project_id', p.project_id, 'name', p.name)) AS projects_pre,
                  ARRAY_AGG(p.name) AS projects_name_pre
             FROM client c
             LEFT JOIN project_x_client pxc
                    ON pxc._client_id = c.client_id
             LEFT JOIN project p
                    ON p.project_id = pxc._project_id
            GROUP BY c.client_id, c.name, c.address, c.ruc, c.person_id_register, c.date_register
            ORDER BY name
            )
            SELECT client_id,
                   name,
                   address,
                   ruc,
                   person_id_register,
                   date_register,
                   CASE WHEN (ARRAY_LENGTH(array_remove(projects_name_pre, null),1)) > 0 THEN projects_pre ELSE NULL END AS projects,
                   CASE WHEN (ARRAY_LENGTH(array_remove(projects_name_pre, null),1)) > 0 THEN projects_name_pre ELSE NULL END AS projects_name
              FROM list_client`;
        dbp.any(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.delete = (clientId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.client_delete($1) res`;
        sql = pgpromise.as.format(sql, [clientId]);
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