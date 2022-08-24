const facturacionModel = require('../models/facturacion')

const controller = {};

controller.obtenerFacturacion = (req, res) => {

    facturacion = facturacionModel.get_facturacion()

    facturacion.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarFacturacion = async (req, res) => {

    const { fac_id, exp_nombre, fac_semana, fecha, fac_descuento, fac_estado } = req.body

    if (!fac_id || !exp_nombre || !fac_semana || !fecha || !fac_descuento || !fac_estado) {
        return res.status(200).send({ message: "Debe llenar todos los campos" });
    } else {
        fac_e = await facturacionModel.obtenerPorId(fac_id);
        exp = await facturacionModel.obtenerIdExportadora(exp_nombre);
        console.log(exp.exp_id);
        if (!fac_e && exp.exp_id) {
            facturacion = facturacionModel.agregar_facturacion(fac_id, exp.exp_id, fac_semana, fecha, fac_descuento, fac_estado);
            facturacion.then(function (data) {
                console.log('agregado');
                return res.status(200).send({ fac: data });
            })
        }
        else {
            if (fac_e) {
                return res.status(200).send({ message: 'Id de factura existente, ingrese otro' });
            }
            else {
                return res.status(500).send({ message: 'Error' });
            }
        }


    }
}

controller.verEditarFacturacion = (req, res) => {
    const { id } = req.params;

    facturacion = facturacionModel.buscar_facturacion(id);
    facturacion.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Factura no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarFacturacion = async (req, res) => {
    var id = req.params.id
    const { exp_nombre, fac_semana, fecha, fac_descuento, fac_estado } = req.body;
    console.log('entro editar');
    if (!exp_nombre || !fac_semana || !fecha || !fac_descuento || !fac_estado) {
        console.log('error en edicion 1 fac');
        return res.status(200).send({ message: "Existen campos vacios" });
    } else {
        exp = await facturacionModel.obtenerIdExportadora(exp_nombre);
        facturacion = facturacionModel.editar_facturacion(id, exp.exp_id, fac_semana, fecha, fac_descuento, fac_estado).then(function (prueba) {
            if (!prueba) {
                console.log('error en edicion 2 fac');
                return res.status(200).send({ message: "No se pudo actualizar la factura" });
            } else {
                console.log('editado');
                console.log('editado logrado');
                return res.status(200).send({ edit: prueba });
            }
        })
    }
}

controller.eliminarFacturacion = (req, res) => {
    const { id } = req.params;

    facturacionModel.eliminar_facturacion(id).then(function (fact) {
        if (fact) {
            console.log('borrado');
            return res.status(200).send({ fac: fact });
        } else {
            return res.status(500).send({ message: "Error borrando la factura" });
        }
    });
}

controller.obtenerDetalleFacturacion = (req, res) => {
    const { id } = req.params;

    facturacion = facturacionModel.get_facturacion_det(id)

    facturacion.then(function (datos) {
        console.log(datos)
        if (datos.length > 0) {
            return res.status(200).send({ datos })
        } else {
            return res.status(200).send({ message: "No existen detalles" });

        }
    })
}



controller.agregarDetalleFacturacion = async (req, res) => {

    const { fac_id, facdet_cod_prog, hac_nombre, tipcaj_nombre, mar_nombre, facdet_cantidad, facdet_precio_unitario } = req.body

    if (!fac_id || !facdet_cod_prog || !hac_nombre || !tipcaj_nombre || !mar_nombre || !facdet_cantidad || !facdet_precio_unitario) {
        return res.status(200).send({ message: "Debe llenar todos los campos" });
    } else {
        fac_e = await facturacionModel.obtenerPorId(fac_id);
        det = await facturacionModel.obtenerIdDetalle(fac_id);
        hac = await facturacionModel.obtenerIdHacienda(hac_nombre);
        tip = await facturacionModel.obtenerIdTipoCaja(tipcaj_nombre);
        mar = await facturacionModel.obtenerIdMarca(mar_nombre);
        if (fac_e && hac.hac_id && tip.tipcaj_id && mar.mar_id && !det) {
            facturacion = facturacionModel.agregar_facturacion_det(fac_id, facdet_cod_prog, hac.hac_id, tip.tipcaj_id, mar.mar_id, facdet_cantidad, facdet_precio_unitario);
            facturacion.then(function (data) {
                console.log('detalle agregado');
                return res.status(200).send({ det: data });
            })
        }
        else {
            if (det) {
                return res.status(200).send({ message: 'Solo puede ingresar un detalle por factura' });
            }
            else {
                return res.status(500).send({ message: 'Error' });
            }
        }


    }
}

controller.verEditarDetalleFacturacion = (req, res) => {
    const { id } = req.params;

    facturacion = facturacionModel.buscar_facturacion_det(id);
    facturacion.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Factura no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarDetalleFacturacion = async (req, res) => {
    var id = req.params.id
    const { facdet_cod_prog, hac_nombre, tipcaj_nombre, mar_nombre, facdet_cantidad, facdet_precio_unitario } = req.body;
    console.log('entro editar');
    if (!facdet_cod_prog || !hac_nombre || !tipcaj_nombre || !mar_nombre || !facdet_cantidad || !facdet_precio_unitario) {
        console.log('error en edicion 1 det');
        return res.status(200).send({ message: "Existen campos vacios" });
    } else {
        hac = await facturacionModel.obtenerIdHacienda(hac_nombre);
        tip = await facturacionModel.obtenerIdTipoCaja(tipcaj_nombre);
        mar = await facturacionModel.obtenerIdMarca(mar_nombre);
        facturacion = facturacionModel.editar_facturacion_det(id, facdet_cod_prog, hac.hac_id, tip.tipcaj_id, mar.mar_id, facdet_cantidad, facdet_precio_unitario).then(function (prueba) {
            if (!prueba) {
                console.log('error en edicion 2 det');
                return res.status(200).send({ message: "No se pudo actualizar la factura" });
            } else {
                console.log('editado');
                console.log('editado logrado');
                return res.status(200).send({ edit: prueba });
            }
        })
    }
}

module.exports = controller;