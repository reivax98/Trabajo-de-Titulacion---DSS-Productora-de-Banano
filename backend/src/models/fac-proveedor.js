const conexion = require("../database")
module.exports = {

    async agregar_factura_proveedor(id, prov, sem, fec, des, fase, obs, cuen, iva, sta){
        let resultados = await conexion.query(`insert into factura_proveedor(facprov_id, prov_id, facprov_semana, 
            facprov_fecha, facprov_descripcion, facprov_fase, facprov_observacion, facprov_descuento,
            facprov_iva, facprov_status) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
            [id, prov, sem, fec, des, fase, obs, cuen, iva, sta]);
        return resultados.rows;
    },
    async get_factura_proveedor() {
        const resultados = await conexion.query(`select fp.facprov_id, pr.prov_nombre, fp.facprov_semana, 
        to_char(fp.facprov_fecha, 'dd-MM-YYYY') as fecha, fp.facprov_descripcion, fp.facprov_fase, 
        fp.facprov_observacion, fp.facprov_descuento,
        fp.facprov_iva, fp.facprov_status from factura_proveedor as fp 
        INNER JOIN proveedor as pr
        ON pr.prov_id = fp.prov_id
        order by fp.facprov_fecha desc`); 
        return resultados.rows;
    },
    async buscar_factura_proveedor(id) {
        const resultados = await conexion.query(`select fp.facprov_id, pr.prov_nombre, fp.facprov_semana, 
        to_char(fp.facprov_fecha, 'YYYY-MM-dd') as fecha , fp.facprov_descripcion, fp.facprov_fase, fp.facprov_observacion, fp.facprov_descuento,
        fp.facprov_iva, fp.facprov_status from factura_proveedor as fp 
		INNER JOIN proveedor as pr
        ON pr.prov_id = fp.prov_id and fp.facprov_id = ($1)`,[id]);
        return resultados.rows[0];
    },
    async editar_factura_proveedor(id, prov, sem, fec, des, fase, obs, cuen, iva, sta) {
        const resultados = await conexion.query(`update factura_proveedor 
        set prov_id = ($2), facprov_semana = ($3), facprov_fecha = ($4), facprov_descripcion = ($5),
        facprov_fase = ($6), facprov_observacion = ($7), facprov_descuento = ($8), facprov_iva = ($9),
        facprov_status = ($10) where facprov_id = ($1)`,[id, prov, sem, fec, des, fase, obs, cuen, iva, sta]);
        return resultados.rows;
    },
    async eliminar_factura_proveedor(id){
        const resultados = await conexion.query(`delete from factura_proveedor where facprov_id = ($1)`,[id]);
        return resultados.rows;
    },
    async get_factura_proveedor_det(id) {
        const resultados = await conexion.query(`SELECT fp.facprov_id, fp.facprov_semana, to_char(fp.facprov_fecha, 'dd-MM-YYYY') as facprov_fecha, 
        fp.facprov_descripcion, fp.facprov_fase, 
        fp.facprov_observacion, fp.facprov_descuento, fp.facprov_iva, fp.facprov_status,
        fpd.facprovdet_insumo, fpd.facprovdet_servicio, fpd.facprovdet_descripcion, 
        fpd.facprovdet_cantidad, fpd.facprovdet_precio_unitario
                FROM factura_proveedor as fp
                INNER JOIN fac_prov_detalle as fpd
                ON fpd.facprov_id = fp.facprov_id
                INNER JOIN proveedor as pr
                ON pr.prov_id = fp.prov_id and fp.facprov_id = ($1)`,[id]);
        return resultados.rows;
    },
    async agregar_factura_proveedor_det(id, ins, ser, desc, can, pre){
        let resultados = await conexion.query(`insert into fac_prov_detalle(facprov_id, facprovdet_insumo, 
            facprovdet_servicio, facprovdet_descripcion, facprovdet_cantidad, facprovdet_precio_unitario) 
            values ($1, $2, $3, $4, $5, $6);`,
            [id, ins, ser, desc, can, pre]);
        return resultados.rows;
    },
    async buscar_factura_proveedor_det(id, ins, ser) {
        const resultados = await conexion.query(`select fp.facprov_id, fp.facprovdet_insumo, fp.facprovdet_servicio, fp.facprovdet_descripcion, 
        fp.facprovdet_cantidad, fp.facprovdet_precio_unitario from fac_prov_detalle as fp 
        where fp.facprov_id = ($1) and fp.facprovdet_insumo = ($2) and fp.facprovdet_servicio = ($3)`,[id, ins, ser]);
        return resultados.rows[0];
    },
    async editar_factura_proveedor_det(id, insumo, servicio, ins, ser, desc, can, pre) {
        const resultados = await conexion.query(`update fac_prov_detalle 
        set facprovdet_insumo = ($4), facprovdet_servicio = ($5), facprovdet_descripcion = ($6), 
        facprovdet_cantidad = ($7), facprovdet_precio_unitario = ($8) where facprov_id = ($1) and facprovdet_insumo = ($2) and facprovdet_servicio = ($3)`
        ,[id, insumo, servicio, ins, ser, desc, can, pre]);
        return resultados.rows; 
    },
    async obtenerIdProveedor(nombre) {
        const resultados = await conexion.query(`select prov_id from proveedor where prov_nombre = ($1)`,[nombre]);
        return resultados.rows[0];
    },
    async obtenerPorId(id) {
        const resultados = await conexion.query(`select * from factura_proveedor where facprov_id = ($1)`,[id]);
        return resultados.rows[0];
    },
    async eliminar_factura_proveedor_det(id, insumo, servicio, cantidad){
        const resultados = await conexion.query(`delete from fac_prov_detalle where facprov_id = ($1) 
        and facprovdet_insumo = ($2) and facprovdet_servicio = ($3) and facprovdet_cantidad = ($4)`,[id, insumo, servicio, cantidad]);
        return resultados.rows;
    },
}