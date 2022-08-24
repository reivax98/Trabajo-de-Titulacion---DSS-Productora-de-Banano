const conexion = require("../database").default
module.exports = {

    async agregar_empleado(nombre) {
        let resultados = await conexion.query(`insert into empleado(emp_nombre_completo)
            values ($1);`, [nombre]);
        return resultados.rows;
    },
    async get_empleado() {
        const resultados = await conexion.query(`select emp_id, emp_nombre_completo from empleado order by emp_id asc`);
        return resultados.rows;
    },
    async buscar_empleado(id) {
        const resultados = await conexion.query(`select emp_id, emp_nombre_completo from empleado where emp_id = ($1)`, [id]);
        return resultados.rows[0];
    },
    async editar_empleado(id, nombre) {
        const resultados = await conexion.query(`update empleado 
        set emp_nombre_completo = ($2) where emp_id = ($1)`, [id, nombre]);
        return resultados.rows;
    },
    async eliminar_empleado(id) {
        const resultados = await conexion.query(`delete from empleado where emp_id = ($1)`, [id]);
        return resultados.rows;
    }
}