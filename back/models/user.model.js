'use strict'

const model = {};

model.insert = (user, password, role_id, active, full_name, description) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.user_insert($1, $2, $3, $4, $5, $6, $7) res`;
        sql = pgpromise.as.format(sql, [full_name, null, role_id, user, password, description, active]);
        dbp.one(sql).then(data => {
            if (data.res.status) return reject(data.res);
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.update = (user, password, role_id, active, full_name, description, userId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.user_update($1, $2, $3, $4, $5, $6, $7, $8) res`;
        sql = pgpromise.as.format(sql, [full_name, null, role_id, user, password, description, active, userId]);
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
        SELECT p.person_id,
               p.name,
               p.last_name,
               CONCAT(p.name, ' ', p.last_name) AS full_name,
               r.role_id,
               r.name as role_name,
               p.user,
               p.password,
               p.active,
               p.description
          FROM person p
               INNER JOIN role_x_person rxp
                       ON rxp._person_id = p.person_id
               INNER JOIN role r
                       ON r.role_id = rxp._role_id
         ORDER BY name`;
        dbp.any(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.delete = (userId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT public.user_delete($1) res`;
        sql = pgpromise.as.format(sql, [userId]);
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