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
        let sql = `SELECT c.*,
                          JSONB_AGG(JSONB_BUILD_OBJECT('project_id', p.project_id, 'name', p.name)) AS projects,
                          ARRAY_AGG(p.name) AS projects_name
                     FROM client c
                     LEFT JOIN project_x_client pxc
                            ON pxc._client_id = c.client_id
                     LEFT JOIN project p
                            ON p.project_id = pxc._project_id
                 GROUP BY c.client_id, c.name, c.address, c.ruc, c.person_id_register, c.date_register
                 ORDER BY name`;
        dbp.any(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

module.exports = model;