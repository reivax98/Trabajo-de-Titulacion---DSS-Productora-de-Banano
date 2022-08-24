const conexion = require("../database").default
module.exports = {

    async agregar_proveedor(nom, ruc, tel1, tel2){
        let resultados = await conexion.query(`insert into proveedor(prov_nombre, prov_ruc_cedula, 
            prov_telefono1, prov_telefono2) values ($1, $2, $3, $4);`,[nom, ruc, tel1, tel2]);
        return resultados.rows;
    },
    async get_proveedor() {
        const resultados = await conexion.query(`select prov_id, prov_nombre, prov_ruc_cedula, prov_telefono1, 
        prov_telefono2 from proveedor order by prov_id desc`);
        return resultados.rows;
    },
    async buscar_proveedor(id) {
        const resultados = await conexion.query(`select prov_id, prov_nombre, prov_ruc_cedula, prov_telefono1, 
        prov_telefono2 from proveedor where prov_id = ($1)`,[id]);
        return resultados.rows[0];
    },
    async editar_proveedor(id, nom, ruc, tel1, tel2) {
        const resultados = await conexion.query(`update proveedor 
        set prov_nombre = ($2), prov_ruc_cedula = ($3), prov_telefono1 = ($4), prov_telefono2 = ($5) 
        where prov_id = ($1)`,[id, nom, ruc, tel1, tel2]);
        return resultados.rows;
    },
    async eliminar_proveedor(id){
        const resultados = await conexion.query(`delete from proveedor where prov_id = ($1)`,[id]);
        return resultados.rows;
    },
    async get_proveedor_orden() {
        const resultados = await conexion.query(`select prov_id, prov_nombre, prov_ruc_cedula, prov_telefono1, 
        prov_telefono2 from proveedor order by prov_nombre asc`);
        return resultados.rows;
    },
    
}