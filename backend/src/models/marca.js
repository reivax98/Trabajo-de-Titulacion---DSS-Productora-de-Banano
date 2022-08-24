const conexion = require("../database").default
module.exports = {

    async agregar_marca(nom){
        let resultados = await conexion.query(`insert into marca(mar_nombre)
            values ($1);`,[nom]);
        return resultados.rows;
    },
    async get_marca() {
        const resultados = await conexion.query(`select mar_id, mar_nombre from marca order by mar_id asc`);
        return resultados.rows;
    },
    async buscar_marca(id) {
        const resultados = await conexion.query(`select mar_id, mar_nombre from marca where mar_id = ($1)`,[id]);
        return resultados.rows[0];
    },
    async editar_marca(id, nom) {
        const resultados = await conexion.query(`update marca 
        set mar_nombre = ($2) where mar_id = ($1)`,[id, nom]);
        return resultados.rows;
    },
    async eliminar_marca(id){
        const resultados = await conexion.query(`delete from marca where mar_id = ($1)`,[id]);
        return resultados.rows;
    }
    
}