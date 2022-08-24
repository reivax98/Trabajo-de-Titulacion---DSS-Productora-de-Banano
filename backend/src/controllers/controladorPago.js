const pagoModel = require('../models/pago')

const controller = {};

controller.obtenerPago = (req, res) => {

    pago = pagoModel.get_pago()

    pago.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarPago = async (req, res) => {

    const { pag_semana, fecha, pag_tipo, emp_nombre_completo, pag_monto } = req.body

    if (!pag_semana || !fecha || !pag_tipo || !emp_nombre_completo || !pag_monto) {
        return res.status(200).send({ message: "Debe llenar todos los campos" });
    } else {
        emp = await pagoModel.obtenerIdEmpleado(emp_nombre_completo);
        pago = pagoModel.agregar_pago(pag_semana, fecha, pag_tipo, emp.emp_id, pag_monto);
        pago.then(function (data) {
            if (!data) {
                console.log('error');
                return res.status(200).send({ message: 'Error en agregar pago' });
            }
            else {
                console.log('agregado');
                return res.status(200).send({ pago: data });
            }
        })
    }
}

controller.verEditarPago = (req, res) => {
    const { id } = req.params;

    pago = pagoModel.buscar_pago(id);
    pago.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Prueba no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarPago = async (req, res) => {
    var id = req.params.id
    const { pag_semana, fecha, pag_tipo, emp_nombre_completo, pag_monto } = req.body;
    console.log('entro');
    if (!pag_semana || !fecha || !pag_tipo || !emp_nombre_completo || !pag_monto) {
        console.log('error en edicion');
        return res.status(200).send({ message: "Existen campos vacios" });

    } else {
        emp = await pagoModel.obtenerIdEmpleado(emp_nombre_completo);
        pago = pagoModel.editar_pago(id, pag_semana, fecha, pag_tipo, emp.emp_id, pag_monto).then(function (prueba) {
            if (!prueba) {
                console.log('error en edicion');
                return res.status(404).send({ message: "No se pudo actualizar el pago" });
            } else {
                console.log('editado');
                return res.status(200).send({ pago: prueba });
            }
        })
    }
}

controller.eliminarPago = (req, res) => {
    const { id } = req.params;

    pagoModel.eliminar_pago(id).then(function (prueba) {
        if (prueba) {
            console.log('borrado');
            return res.status(200).send({ pruebas: prueba });
        } else {
            return res.status(500).send({ message: "Error borrando el pago" });
        }
    });
}

controller.obtenerPagoReporte = (req, res) => {
    const { sem, anio } = req.params;

    pago = pagoModel.get_pago_reporte(sem, anio)

    pago.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerPagoSemanas = (req, res) => {

    pago = pagoModel.get_pago_semana()

    pago.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerPagoAnios = (req, res) => {

    pago = pagoModel.get_pago_anio()

    pago.then(function (datos) {
        return res.status(200).json({ datos })
    })
}


controller.obtenerEmpleadoOrden = (req, res) => {

    pago = pagoModel.get_empleado_orden()

    pago.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

module.exports = controller;