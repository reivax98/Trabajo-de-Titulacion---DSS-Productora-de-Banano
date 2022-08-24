const conexion = require("../database").default
module.exports = {

    async agregar_hacienda(nom, hec, loc, sec, prov){
        let resultados = await conexion.query(`insert into hacienda(hac_nombre, hac_hectareas, hac_localidad, 
            hac_sector, hac_provincia) values ($1, $2, $3, $4, $5);`,[nom, hec, loc, sec, prov]);
        return resultados.rows;
    },
    async get_hacienda() {
        const resultados = await conexion.query(`select hac_id, hac_nombre, hac_hectareas, hac_localidad, 
        hac_sector, hac_provincia from hacienda order by hac_id asc`);
        return resultados.rows;
    },
    async buscar_hacienda(id) {
        const resultados = await conexion.query(`select hac_id, hac_nombre, hac_hectareas, hac_localidad, 
        hac_sector, hac_provincia from hacienda where hac_id = ($1)`,[id]);
        return resultados.rows[0];
    },
    async editar_hacienda(id, nom, hec, loc, sec, prov) {
        const resultados = await conexion.query(`update hacienda 
        set hac_nombre = ($2), hac_hectareas = ($3), hac_localidad = ($4), hac_sector = ($5), 
        hac_provincia = ($6) where hac_id = ($1)`,[id, nom, hec, loc, sec, prov]);
        return resultados.rows;
    },
    async eliminar_hacienda(id){
        const resultados = await conexion.query(`delete from hacienda where hac_id = ($1)`,[id]);
        return resultados.rows;
    }
    
}