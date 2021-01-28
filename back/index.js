'use strict'
const   app = require('./app');

// CONEXION A BD //
if (!global.pgpromise) {
    const initOptions = {
        // global event notification;
        noWarnings: false,
        error(error, e) {
            if (e.cn) {
                // A connection-related error;
                //
                // Connections are reported back with the password hashed,
                // for safe errors logging, without exposing passwords.
                console.log(`Error de conexion: `, error.message || error);
                console.log('CN:', e.cn);
                console.log('EVENT:', error.message || error);
            }
        }
    };
    global.pgpromise = require("pg-promise")(initOptions);
}
const __conexion = "postgres://postgres:postgres@localhost:5432/rehobotIngenieros";
global.dbp = pgpromise(__conexion);
global.dbp.connect();

app.listen(app.get('port'), function() {
	console.log(`Iniciando Express en el puerto ${app.get('port')}`);
});
