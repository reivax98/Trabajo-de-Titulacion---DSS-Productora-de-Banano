const proveedorModel = require('../models/proveedor')

const controller = {};

controller.obtenerProveedor = (req, res) => {

    proveedor = proveedorModel.get_proveedor()

    proveedor.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarProveedor = (req, res) => {

    const { prov_nombre, prov_ruc_cedula, prov_telefono1, prov_telefono2 } = req.body

    if (!prov_nombre) {
        return res.status(500).send({ message: "Debe llenar todos los campos" });
    } else {
        proveedor = proveedorModel.agregar_proveedor(prov_nombre, prov_ruc_cedula, prov_telefono1, prov_telefono2);
        proveedor.then(function (data) {
            console.log('agregado');
            return res.status(200).send({ pruebas: data });
        })
    }
}

controller.verEditarProveedor = (req, res) => {
    const { id } = req.params;

    proveedor = proveedorModel.buscar_proveedor(id);
    proveedor.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Proveedor no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarProveedor = (req, res) => {
    var id = req.params.id
    const { prov_nombre, prov_ruc_cedula, prov_telefono1, prov_telefono2 } = req.body;
    console.log('entro');
    if (prov_nombre) {
        proveedor = proveedorModel.editar_proveedor(id, prov_nombre, prov_ruc_cedula, prov_telefono1, prov_telefono2).then(function (prueba) {
            if (!prueba) {
                console.log('error en edicion');
                return res.status(404).send({ message: "No se pudo actualizar al proveedor" });
            } else {
                console.log('editado');
                return res.status(200).send({ pruebas: prueba });
            }
        })
    } else {
        console.log('error en edicion');
        return res.status(200).send({ message: "Existen campos vacios" });
    }
}

controller.eliminarProveedor = async (req, res) => {
    const { id } = req.params;

    try {
        await proveedorModel.eliminar_proveedor(id).then(function (prueba) {
            if (prueba) {
                console.log('borrado');
                return res.status(200).send({ prov: prueba });
            } else {
                console.log('error 1');
                return res.status(200).send({ message: "Error borrando la prueba" });
            }
        })
    } catch (e) {
        res.status(200).send({ message: "No se puede eliminar registro, debido a que esta indexado en otras tablas" });
    }
}

controller.obtenerProveedorOrden = (req, res) => {

    proveedor = proveedorModel.get_proveedor_orden()

    proveedor.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

module.exports = controller;