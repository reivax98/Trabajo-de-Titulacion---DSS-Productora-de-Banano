const conexion = require("../database").default
module.exports = {

    async agregar_facturacion(id, exp, sem, fec, des, est) {
        let resultados = await conexion.query(`insert into facturacion(fac_id, exp_id, fac_semana, fac_fecha,
            fac_descuento, fac_estado) values ($1, $2, $3, $4, $5, $6);`, [id, exp, sem, fec, des, est]);
        return resultados.rows;
    },
    async get_facturacion() {
        const resultados = await conexion.query(`select f.fac_id, f.exp_id, e.exp_nombre, f.fac_semana, 
        to_char(f.fac_fecha, 'dd-MM-YYYY') as fecha,
        f.fac_descuento, f.fac_estado from facturacion as f 
        INNER JOIN exportadora as e
        ON f.exp_id = e.exp_id
        order by f.fac_id desc`);
        return resultados.rows;
    },
    async buscar_facturacion(id) {
        const resultados = await conexion.query(`select f.fac_id, e.exp_id, e.exp_nombre, f.fac_semana, 
        to_char(f.fac_fecha, 'YYYY-MM-dd') as fecha,
        f.fac_descuento, f.fac_estado from facturacion as f 
        INNER JOIN exportadora as e
        ON f.exp_id = e.exp_id and fac_id = ($1)`, [id]);
        return resultados.rows[0];
    },
    async editar_facturacion(id, exp, sem, fec, des, est) {
        const resultados = await conexion.query(`update facturacion 
        set exp_id = ($2), fac_semana = ($3), fac_fecha = ($4), fac_descuento = ($5), fac_estado = ($6) where fac_id = ($1)`, [id, exp, sem, fec, des, est]);
        return resultados.rows;
    },
    async eliminar_facturacion(id) {
        const resultados = await conexion.query(`delete from facturacion where fac_id = ($1)`, [id]);
        return resultados.rows;
    },
    async get_facturacion_det(id) {
        const resultados = await conexion.query(`SELECT fd.fac_id, to_char(f.fac_fecha, 'dd-MM-YYYY') as fac_fecha, 
        e.exp_nombre, e.exp_direccion, e.exp_ruc, fd.facdet_cod_prog, ha.hac_nombre, tc.tipcaj_nombre, ma.mar_nombre, fd.facdet_cantidad, 
        fd.facdet_precio_unitario, f.fac_descuento
        FROM facturacion as f 
        INNER JOIN fac_detalle as fd
        ON f.fac_id = fd.fac_id
        INNER JOIN exportadora as e
        ON f.exp_id = e.exp_id
		INNER JOIN marca as ma
        ON fd.mar_id = ma.mar_id
        INNER JOIN hacienda as ha
        ON fd.hac_id = ha.hac_id
        INNER JOIN tipo_caja as tc
        ON fd.tipcaj_id = tc.tipcaj_id and fd.fac_id = ($1)`, [id]);
        return resultados.rows;
    },
    async obtenerPorId(id) {
        const resultados = await conexion.query(`select f.fac_id, f.exp_id, e.exp_nombre, f.fac_semana, 
        to_char(f.fac_fecha, 'dd-MM-YYYY') as fecha,
        f.fac_descuento, f.fac_estado from facturacion as f 
        INNER JOIN exportadora as e
        ON f.exp_id = e.exp_id and f.fac_id = ($1)`, [id]);
        return resultados.rows[0];
    },
    async obtenerIdDetalle(id) {
        const resultados = await conexion.query(`select fac_id from fac_detalle where fac_id = ($1)`, [id]);
        return resultados.rows[0];
    },
    async obtenerIdExportadora(nombre) {
        const resultados = await conexion.query(`select exp_id from exportadora where exp_nombre = ($1)`, [nombre]);
        return resultados.rows[0];
    },
    async obtenerIdHacienda(nombre) {
        const resultados = await conexion.query(`select hac_id from hacienda where hac_nombre = ($1)`, [nombre]);
        return resultados.rows[0];
    },
    async obtenerIdTipoCaja(nombre) {
        const resultados = await conexion.query(`select tipcaj_id from tipo_caja where tipcaj_nombre = ($1)`, [nombre]);
        return resultados.rows[0];
    },
    async obtenerIdMarca(nombre) {
        const resultados = await conexion.query(`select mar_id from marca where mar_nombre = ($1)`, [nombre]);
        return resultados.rows[0];
    },
    async agregar_facturacion_det(id, cod, hac, tip, mar, can, pre) {
        let resultados = await conexion.query(`insert into fac_detalle(fac_id, facdet_cod_prog, hac_id, 
            tipcaj_id, mar_id, facdet_cantidad, facdet_precio_unitario) values ($1, $2, $3, $4, $5, $6, $7);`
            , [id, cod, hac, tip, mar, can, pre]);
        return resultados.rows;
    },
    async buscar_facturacion_det(id) {
        const resultados = await conexion.query(`select fd.fac_id, fd.facdet_cod_prog, ha.hac_nombre, tp.tipcaj_nombre, ma.mar_nombre, fd.facdet_cantidad, 
        fd.facdet_precio_unitario from fac_detalle as fd
        INNER JOIN hacienda as ha
        ON fd.hac_id = ha.hac_id
		INNER JOIN tipo_caja as tp
        ON fd.tipcaj_id = tp.tipcaj_id
		INNER JOIN marca as ma
        ON fd.mar_id = ma.mar_id and fd.fac_id = ($1)`, [id]);
        return resultados.rows[0];
    },
    async editar_facturacion_det(id, cod, hac, tip, mar, can, pre) {
        const resultados = await conexion.query(`update fac_detalle 
        set facdet_cod_prog = ($2), hac_id = ($3), tipcaj_id = ($4), mar_id = ($5)
        , facdet_cantidad = ($6), facdet_precio_unitario = ($7) where fac_id = ($1)`, [id, cod, hac, tip, mar, can, pre]);
        return resultados.rows;
    },
}