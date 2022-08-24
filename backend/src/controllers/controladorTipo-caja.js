const tipoCajaModel = require('../models/tipo-caja')

const controller = {};

controller.obtenerTipoCaja = (req, res) => {

    tipocaja = tipoCajaModel.get_tipo_caja()

    tipocaja.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarTipoCaja = (req, res) => {

    const { tipcaj_nombre } = req.body

    if (!tipcaj_nombre) {
        return res.status(500).send({ message: "Debe llenar todos los campos" });
    } else {
        tipocaja = tipoCajaModel.agregar_tipo_caja(tipcaj_nombre);
        tipocaja.then(function (data) {
            console.log('agregado');
            return res.status(200).send({ tipcaj: data });
        })
    }
}

controller.verEditarTipoCaja = (req, res) => {
    const { id } = req.params;

    tipocaja = tipoCajaModel.buscar_tipo_caja(id);
    tipocaja.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Prueba no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarTipoCaja = (req, res) => {
    var id = req.params.id
    const { tipcaj_nombre } = req.body;
    console.log('entro');
    if (tipcaj_nombre) {
        tipocaja = tipoCajaModel.editar_tipo_caja(id, tipcaj_nombre).then(function (prueba) {
            if (!prueba) {
                console.log('error en edicion');
                return res.status(404).send({ message: "No se pudo actualizar el tipo de caja" });
            } else {
                console.log('editado');
                return res.status(200).send({ tipcaj: prueba });
            }
        })
    } else {
        console.log('error en edicion');
        return res.status(200).send({ message: "Existen campos vacios" });
    }
}

controller.eliminarTipoCaja = async (req, res) => {
    const { id } = req.params;

    try {
        await tipoCajaModel.eliminar_tipo_caja(id).then(function (prueba) {
            if (prueba) {
                console.log('borrado');
                return res.status(200).send({ tipcaj: prueba });
            } else {
                return res.status(500).send({ message: "Error borrando el tipo de caja" });
                //res.status(500).send(`error ${err.message}`)
            }
        });
    } catch (e) {
        res.status(200).send({ message: "No se puede eliminar registro, debido a que esta indexado en otras tablas" });
    }

}

module.exports = controller;