const conexion = require("../database").default
module.exports = {

    async obtenerPorEmail(email) {
        const resultados = await conexion.query(`select * from usuario where us_correo=($1)`, [email]);
        return resultados.rows[0]; 
    },
    async agregarResetToken(id, resettoken) {
        let resultados = await conexion.query(`UPDATE usuario SET us_resettoken=($2) WHERE us_id=($1)`, [id,resettoken]);
        return resultados.rows[0];
    },
    async buscarResetToken(resettoken) {
        let resultados = await conexion.query(`select * from usuario WHERE us_resettoken=($1)`, [resettoken]);
        return resultados.rows[0];
    },
    async resetPassword(id, newPassword) {
        let resultados = await conexion.query(`UPDATE usuario SET us_clave=($2) WHERE us_id=($1)`, [id,newPassword]);
        return resultados.rows[0];
    },
    async agregar_usuario(nom, ape, cor, tel, gen, rol, pass){
        let resultados = await conexion.query(`insert into usuario(us_nombres, us_apellidos, us_correo, 
            us_telefono, us_genero, us_rol, us_clave) values ($1, $2, $3, $4, $5, $6, $7);`,
            [nom, ape, cor, tel, gen, rol, pass]);
        return resultados.rows[0];
    },
    async get_usuario() {
        const resultados = await conexion.query(`select us_id, us_nombres, us_apellidos, us_correo, 
        us_telefono, us_genero, us_rol, us_clave from usuario order by us_id asc`);
        return resultados.rows;
    },
    async buscar_usuario(id) {
        const resultados = await conexion.query(`select us_id, us_nombres, us_apellidos, us_correo, 
        us_telefono, us_genero, us_rol, us_clave from usuario where us_id = ($1)`,[id]);
        return resultados.rows[0];
    },
    async editar_usuario(id, nom, ape, cor, tel, gen, rol, pass) {
        const resultados = await conexion.query(`update usuario 
        set us_nombres = ($2), us_apellidos = ($3), us_correo = ($4), us_telefono = ($5), 
        us_genero = ($6), us_rol = ($7), us_clave  = ($8) where us_id = ($1)`,[id, nom, ape, cor, tel, gen, rol, pass]);
        return resultados.rows;
    },
    async eliminar_usuario(id){
        const resultados = await conexion.query(`delete from usuario where us_id = ($1)`,[id]);
        return resultados.rows;
    },
    async obtenerId(id) {
        const resultados = await conexion.query(`select * from usuario where us_id=($1)`, [id]);
        return resultados.rows[0]; 
    },
}