const facProveedorModel = require('../models/fac-proveedor')

const controller = {};

controller.obtenerFacProveedor = (req, res) => {

    facproveedores = facProveedorModel.get_factura_proveedor()

    facproveedores.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarFacProveedor = (req, res) => {

    const { id, prov, sem, fec, des, fase, obs, cuen, iva, sta } = req.body

    if (!id || !prov || !sem || !fec || !fase || !cuen || !iva || !sta) {
        return res.status(500).send({ message: "Debe llenar todos los campos" });
    } else {
        facproveedor = facProveedorModel.agregar_factura_proveedor(id, prov, sem, fec, des, fase, obs, cuen, iva, sta);
        facproveedor.then(function (data) {
            console.log('agregado');
            return res.status(200).send({ facprov: data });
        })
    }
}

controller.agregarFacProveedor = async (req, res) => {

    const { facprov_id, prov_nombre, facprov_semana,
        fecha, facprov_descripcion, facprov_fase,
        facprov_observacion, facprov_descuento,
        facprov_iva, facprov_status } = req.body

    if (!facprov_id || !prov_nombre || !facprov_semana || !fecha || !facprov_fase || !facprov_descuento || !facprov_iva || !facprov_status) {
        return res.status(200).send({ message: "Debe llenar todos los campos" });
    } else {
        fac_e = await facProveedorModel.obtenerPorId(facprov_id);
        prov = await facProveedorModel.obtenerIdProveedor(prov_nombre);
        //console.log(exp.exp_id);
        if (!fac_e && prov.prov_id) {
            facproveedor = facProveedorModel.agregar_factura_proveedor(facprov_id, prov.prov_id, facprov_semana,
                fecha, facprov_descripcion, facprov_fase,
                facprov_observacion, facprov_descuento,
                facprov_iva, facprov_status);
            facproveedor.then(function (data) {
                console.log('agregado');
                return res.status(200).send({ fac: data });
            })
        }
        else {
            if (fac_e) {
                return res.status(200).send({ message: 'Id de factura proveedor existente, ingrese otro' });
            }
            else {
                return res.status(500).send({ message: 'Error' });
            }
        }
    }
}

controller.verEditarFacProveedor = (req, res) => {
    const { id } = req.params;

    facproveedor = facProveedorModel.buscar_factura_proveedor(id);
    facproveedor.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Prueba no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarFacProveedor = async (req, res) => {
    var id = req.params.id
    const { prov_nombre, facprov_semana, fecha, facprov_descripcion, facprov_fase, facprov_observacion,
        facprov_descuento, facprov_iva, facprov_status } = req.body;
    console.log('entro');
    if (!prov_nombre || !facprov_semana || !fecha || !facprov_fase || !facprov_descuento || !facprov_iva || !facprov_status) {
        console.log('error en edicion 1 fac');
        return res.status(200).send({ message: "Existen campos vacios" });
    } else {
        prov = await facProveedorModel.obtenerIdProveedor(prov_nombre);
        facproveedor = facProveedorModel.editar_factura_proveedor(id, prov.prov_id, facprov_semana, fecha,
            facprov_descripcion, facprov_fase, facprov_observacion, facprov_descuento, facprov_iva,
            facprov_status).then(function (prueba) {
                if (!prueba) {
                    console.log('error en edicion');
                    return res.status(200).send({ message: "No se pudo actualizar la factura de proveedor" });
                } else {
                    console.log('editado bien');
                    return res.status(200).send({ facprov: prueba });
                }
            })
    }
}

controller.eliminarFacProveedor = async (req, res) => {
    const { id } = req.params;

    try {
        await facProveedorModel.eliminar_factura_proveedor(id).then(function (prueba) {
            if (prueba) {
                console.log('borrado');
                return res.status(200).send({ facprov: prueba });
            } else {
                return res.status(500).send({ message: "Error borrando la factura del proveedor" });
            }
        });
    } catch (e) {
        res.status(200).send({ message: "No se puede eliminar registro, debido a que posee detalles" });
    }
}

controller.obtenerDetalleFacProveedor = (req, res) => {
    const { id } = req.params;

    facproveedor = facProveedorModel.get_factura_proveedor_det(id)

    facproveedor.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Detalle no existe" });
        } else {
            return res.status(200).send({ datos })
        }
    })
}


controller.agregarFacProveedorDetalle = (req, res) => {

    var { facprov_id, facprovdet_insumo, facprovdet_servicio, facprovdet_descripcion, facprovdet_cantidad, facprovdet_precio_unitario } = req.body
    if (facprovdet_insumo == null)
        facprovdet_insumo = ''
    if (facprovdet_servicio == null)
        facprovdet_servicio = ''
    if (facprovdet_descripcion == null)
        facprovdet_descripcion = ''
    console.log(facprov_id, facprovdet_insumo, facprovdet_servicio, facprovdet_descripcion, facprovdet_cantidad, facprovdet_precio_unitario)

    if (!facprov_id || !facprovdet_cantidad || !facprovdet_precio_unitario) {
        return res.status(200).send({ message: "Debe llenar todos los campos" });
    } else {
        facproveedor = facProveedorModel.agregar_factura_proveedor_det(facprov_id, facprovdet_insumo, facprovdet_servicio, facprovdet_descripcion, facprovdet_cantidad, facprovdet_precio_unitario);
        facproveedor.then(function (data) {
            if (data) {
                console.log('agregado');
                return res.status(200).send({ fac: data });
            }
            else {
                return res.status(200).send({ message: 'Error en agregar detalle factura proveedor' });
            }
        })
    }
}

controller.verEditarFacProveedorDetalle = (req, res) => {
    const { params } = req.params;
    var det = JSON.parse(params)
    facproveedor = facProveedorModel.buscar_factura_proveedor_det(det.facprov_id, det.facprovdet_insumo, det.facprovdet_servicio);
    facproveedor.then(function (datos) {
        if (!datos) {
            return res.status(200).send({ message: "Detalle factura proveedor no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarFacProveedorDetalle = (req, res) => {
    const { params } = req.params;
    let arr = JSON.parse(params)
    const { facprovdet_insumo, facprovdet_servicio, facprovdet_descripcion, facprovdet_cantidad, facprovdet_precio_unitario } = req.body;
    console.log('entro');
    if (!facprovdet_cantidad || !facprovdet_precio_unitario) {
        console.log('error en edicion 1');
        return res.status(200).send({ message: "Existen campos vacios" });
    } else {
        facproveedor = facProveedorModel.editar_factura_proveedor_det(arr[0], arr[1], arr[2], facprovdet_insumo, facprovdet_servicio, facprovdet_descripcion, facprovdet_cantidad, facprovdet_precio_unitario).then(function (prueba) {
            if (!prueba) {
                console.log('error en edicion 2');
                return res.status(200).send({ message: "No se pudo actualizar la factura de proveedor" });
            } else {
                console.log('editado');
                return res.status(200).send({ facprov: prueba });
            }
        })
    }
}

controller.eliminarFacProveedorDetalle = async (req, res) => {
    const { params } = req.params;
    var det = JSON.parse(params)
    console.log(det.facprovdet_servicio);
    if (det.facprovdet_insumo === null)
        det.facprovdet_insumo = ''
    if (det.facprovdet_servicio === null)
        det.facprovdet_servicio = ''
    try {
        await facProveedorModel.eliminar_factura_proveedor_det(det.facprov_id, det.facprovdet_insumo,
            det.facprovdet_servicio, det.facprovdet_cantidad).then(function (prueba) {
                if (prueba) {
                    console.log('detalle borrado');
                    return res.status(200).send({ facprov: prueba });
                } else {
                    return res.status(500).send({ message: "Error borrando la prueba" });
                }
            });
    } catch (e) {
        res.status(200).send({ message: "No se puede eliminar detalle" });
    }
}


module.exports = controller;