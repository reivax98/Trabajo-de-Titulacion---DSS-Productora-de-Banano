const conexion = require("../database")
module.exports = {

    async get_ingresos() {
        const resultados = await conexion.query(`select * from ingresos`);
        return resultados.rows;
    },
    async get_egresos() {
        const resultados = await conexion.query(`select * from egresos_x_semana`);
        return resultados.rows;
    },
    async get_ingreso_reciente() {
        const resultados = await conexion.query(`select * from ingreso_reciente`);
        return resultados.rows[0];
    },
    async get_egreso_reciente() {
        const resultados = await conexion.query(`select * from egresos_x_mes order by anio desc limit 1 `);
        //const resultados = await conexion.query(`select * from egreso_reciente`);
        return resultados.rows[0];
    },
    async get_mayor_proveedor() {
        const resultados = await conexion.query(`select fp.prov_nombre, sum(fp.total) as mayor
        from facturas_proveedor as fp
        where EXTRACT(YEAR FROM fp.facprov_fecha) = (select max(anio) as anio_reciente from mes_reciente_facprov_pagos
            group by anio
            order by anio DESC limit 1)
        GROUP BY fp.prov_nombre
        order by mayor DESC limit 1 offset 0`);
        return resultados.rows[0];
    },
    async get_ingresos_anio() {
        const resultados = await conexion.query(`select fm.anio, sum(fm.total) as total
        from facturas_x_mes as fm 
        where fm.mes = (select mes from mes_reciente_facturas as ms
            where ms.anio = (select max(anio) as anio_reciente from mes_reciente_facturas
            group by anio
            order by anio DESC limit 1) LIMIT 1) 
        and fm.anio = (select max(anio) as anio_reciente from mes_reciente_facturas
            group by anio
            order by anio DESC limit 1)
        GROUP BY fm.anio`);
        return resultados.rows[0];
    },
    async get_ingresos_x_mes() {
        const resultados = await conexion.query(`select * from ingresos_x_mes`);
        return resultados.rows;
    },
    async get_engresos_x_mes() {
        const resultados = await conexion.query(`select * from egresos_x_mes`);
        return resultados.rows;
    }

}