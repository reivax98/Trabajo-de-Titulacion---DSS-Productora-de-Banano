const conexion = require("../database").default
module.exports = {

    async agregar_exportadora(nom, desc, ruc, dir, tel1, tel2){
        let resultados = await conexion.query(`insert into exportadora(exp_nombre, exp_descripcion, exp_ruc, 
            exp_direccion, exp_telefono1, exp_telefono2) values ($1, $2, $3, $4, $5, $6);`,
            [nom, desc, ruc, dir, tel1, tel2]);
        return resultados.rows;
    },
    async get_exportadora() {
        const resultados = await conexion.query(`select exp_id, exp_nombre, exp_descripcion, exp_ruc, 
        exp_direccion, exp_telefono1, exp_telefono2 from exportadora order by exp_id asc`);
        return resultados.rows;
    },
    async buscar_exportadora(id) {
        const resultados = await conexion.query(`select exp_id, exp_nombre, exp_descripcion, exp_ruc, 
        exp_direccion, exp_telefono1, exp_telefono2 from exportadora where exp_id = ($1)`,[id]);
        return resultados.rows[0];
    },
    async editar_exportadora(id, nom, desc, ruc, dir, tel1, tel2) {
        const resultados = await conexion.query(`update exportadora 
        set exp_nombre = ($2), exp_descripcion = ($3), exp_ruc = ($4), exp_direccion = ($5), 
        exp_telefono1 = ($6), exp_telefono2 = ($7) where exp_id = ($1)`,[id, nom, desc, ruc, dir, tel1, tel2]);
        return resultados.rows;
    },
    async eliminar_exportadora(id){
        const resultados = await conexion.query(`delete from exportadora where exp_id = ($1)`,[id]);
        return resultados.rows;
    }
    
}