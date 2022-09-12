const conexion = require("../database")
module.exports = {

    async agregar_tipo_caja(nom){
        let resultados = await conexion.query(`insert into tipo_caja(tipcaj_nombre) values ($1);`,[nom]);
        return resultados.rows;
    },
    async get_tipo_caja() {
        const resultados = await conexion.query(`select tipcaj_id, tipcaj_nombre from tipo_caja order by 
        tipcaj_id asc`);
        return resultados.rows;
    },
    async buscar_tipo_caja(id) {
        const resultados = await conexion.query(`select tipcaj_id, tipcaj_nombre from tipo_caja 
        where tipcaj_id = ($1)`,[id]);
        return resultados.rows[0];
    },
    async editar_tipo_caja(id, nom) {
        const resultados = await conexion.query(`update tipo_caja 
        set tipcaj_nombre = ($2) where tipcaj_id = ($1)`,[id, nom]);
        return resultados.rows;
    },
    async eliminar_tipo_caja(id){
        const resultados = await conexion.query(`delete from tipo_caja where tipcaj_id = ($1)`,[id]);
        return resultados.rows;
    }
    
}