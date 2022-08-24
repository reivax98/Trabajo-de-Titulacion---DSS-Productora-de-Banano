const haciendaModel = require('../models/hacienda')

const controller = {};

controller.obtenerHacienda = (req, res) => {

    hacienda = haciendaModel.get_hacienda()

    hacienda.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarHacienda = (req, res) => {

    const { hac_nombre, hac_hectareas, hac_localidad, hac_sector, hac_provincia } = req.body

    if (!hac_nombre) {
        return res.status(500).send({ message: "Debe llenar todos los campos" });
    } else {
        hacienda = haciendaModel.agregar_hacienda(hac_nombre, hac_hectareas, hac_localidad, hac_sector, hac_provincia);
        hacienda.then(function (data) {
            if (data) {
                console.log('agregado');
                return res.status(200).send({ hac: data });
            }
            else {
                console.log('error de agregacion');
            }

        })
    }
}

controller.verEditarHacienda = (req, res) => {
    const { id } = req.params;

    hacienda = haciendaModel.buscar_hacienda(id);
    hacienda.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Prueba no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarHacienda = (req, res) => {
    var id = req.params.id
    const { hac_nombre, hac_hectareas, hac_localidad, hac_sector, hac_provincia } = req.body;
    console.log('entro');
    if (hac_nombre) {
        hacienda = haciendaModel.editar_hacienda(id, hac_nombre, hac_hectareas, hac_localidad, hac_sector, hac_provincia).then(function (prueba) {
            if (!prueba) {
                console.log('error en edicion');
                return res.status(404).send({ message: "No se pudo actualizar la hacienda" });
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

controller.eliminarHacienda = async (req, res) => {
    const { id } = req.params;

    try {
        await haciendaModel.eliminar_hacienda(id).then(function (prueba) {
            if (prueba) {
                console.log('borrado');
                return res.status(200).send({ hac: prueba });
            } else {
                return res.status(500).send({ message: "Error borrando la hacienda" });
            }
        })
    } catch (e) {
        res.status(200).send({ message: "No se puede eliminar registro, debido a que esta indexado en otras tablas" });
    }


}

module.exports = controller;