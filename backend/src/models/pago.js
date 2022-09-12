const conexion = require("../database")
module.exports = {

    async agregar_pago(sem, fec, tip, emp, mon){
        let resultados = await conexion.query(`insert into pago(pag_semana, pag_fecha, 
            pag_tipo, emp_id, pag_monto)
            values ($1, $2, $3, $4, $5);`,[sem, fec, tip, emp, mon]);
        return resultados.rows;
    },
    async get_pago() {
        const resultados = await conexion.query(`select pa.pag_id, pa.pag_semana, 
        to_char(pa.pag_fecha, 'dd-MM-YYYY') as fecha,
        pa.pag_tipo, em.emp_nombre_completo, pa.pag_monto 
        from pago as pa
        INNER JOIN empleado as em
        ON em.emp_id = pa.emp_id
        order by pag_id desc`);
        return resultados.rows;
    },
    async buscar_pago(id) {
        const resultados = await conexion.query(`select pa.pag_id, pa.pag_semana, 
        to_char(pa.pag_fecha, 'YYYY-MM-dd') as fecha, 
        pa.pag_tipo, em.emp_nombre_completo, pa.pag_monto from pago as pa
		INNER JOIN empleado as em
        ON em.emp_id = pa.emp_id and pa.pag_id = ($1)`,[id]);
        return resultados.rows[0];
    },
    async editar_pago(id, sem, fec, tip, emp, mon) {
        const resultados = await conexion.query(`update pago 
        set pag_semana = ($2), pag_fecha = ($3), pag_tipo = ($4),
        emp_id = ($5), pag_monto = ($6) where pag_id = ($1)`,[id, sem, fec, tip, emp, mon]);
        return resultados.rows;
    },
    async eliminar_pago(id){
        const resultados = await conexion.query(`delete from pago where pag_id = ($1)`,[id]);
        return resultados.rows;
    },
    async get_pago_reporte(sem, anio) {
        const resultados = await conexion.query(`select pa.pag_id, pa.pag_semana, 
        to_char(pa.pag_fecha, 'dd-MM-YYYY') as fecha,
        pa.pag_tipo, em.emp_nombre_completo, pa.pag_monto 
        from pago as pa
        INNER JOIN empleado as em
        ON em.emp_id = pa.emp_id and pag_semana = ($1) and extract(year from pag_fecha) = ($2)`,[sem, anio]);
        return resultados.rows;
    },
    async get_pago_semana() {
        const resultados = await conexion.query(`select pag_semana from sem_anio_pagos group by pag_semana order by pag_semana`);
        return resultados.rows;
    },
    async get_pago_anio() {
        const resultados = await conexion.query(`select anio from sem_anio_pagos group by anio order by anio`);
        return resultados.rows;
    },
    async get_empleado_orden() {
        const resultados = await conexion.query(`select emp_id, emp_nombre_completo from empleado order by emp_nombre_completo asc`);
        return resultados.rows;
    },
    async obtenerIdEmpleado(nombre) {
        const resultados = await conexion.query(`select emp_id from empleado where emp_nombre_completo = ($1)`,[nombre]);
        return resultados.rows[0];
    },
}