const conexion = require("../database")
module.exports = {

    async get_tzSiembra() {
        const resultados = await conexion.query(`select fp.facprov_semana, 
        EXTRACT(YEAR FROM fp.facprov_fecha) as anio, sum(total) 
        from facturas_proveedor as fp
        where fp.facprov_fase = 'Siembra'
        GROUP BY fp.facprov_semana, anio
        ORDER BY anio, fp.facprov_semana`);
        return resultados.rows;
    },
    async get_tzCuidado() {
        const resultados = await conexion.query(`select fp.facprov_semana, 
        EXTRACT(YEAR FROM fp.facprov_fecha) as anio, sum(total) 
        from facturas_proveedor as fp
        where fp.facprov_fase = 'Cuidado'
        GROUP BY fp.facprov_semana, anio
        ORDER BY anio, fp.facprov_semana`);
        return resultados.rows;
    },
    async get_tzCosecha() {
        const resultados = await conexion.query(`SELECT * FROM pagos_cosecha_semana_anio`);
        return resultados.rows;
    },
    async get_tzSiembra_Mes() {
        const resultados = await conexion.query(`select to_char(fp.facprov_fecha, 'TMMonth') as mes,
        EXTRACT(YEAR FROM fp.facprov_fecha) as anio, sum(total) 
        from facturas_proveedor as fp
        where fp.facprov_fase = 'Siembra'
        GROUP BY mes, anio
        ORDER BY anio, (EXTRACT(month FROM to_date(to_char(fp.facprov_fecha, 'TMMonth'), 'TMMonth')));`);
        return resultados.rows;
    },
    async get_tzCuidado_Mes() {
        const resultados = await conexion.query(`select to_char(fp.facprov_fecha, 'TMMonth') as mes,
        EXTRACT(YEAR FROM fp.facprov_fecha) as anio, sum(total) 
        from facturas_proveedor as fp
        where fp.facprov_fase = 'Cuidado'
        GROUP BY mes, anio
        ORDER BY anio, (EXTRACT(month FROM to_date(to_char(fp.facprov_fecha, 'TMMonth'), 'TMMonth')));`);
        return resultados.rows;
    },
    async get_tzCosecha_Mes() {
        const resultados = await conexion.query(`SELECT to_char(pago.pag_fecha, 'TMMonth') AS mes,
        EXTRACT(year FROM pago.pag_fecha) AS anio,
        sum(pago.pag_monto) AS total
        FROM pago
        WHERE pago.pag_tipo = 'ROL DE PAGO CUADRILLA'
        GROUP BY mes, anio
        ORDER BY anio, (EXTRACT(month FROM to_date(to_char(pago.pag_fecha, 'TMMonth'), 'TMMonth')))`);
        return resultados.rows;
    }
    
}