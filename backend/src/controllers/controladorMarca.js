const marcaModel = require('../models/marca')

const controller = {};

controller.obtenerMarca = (req, res) => {

    marca = marcaModel.get_marca()

    marca.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarMarca = (req, res) => {

    const { mar_nombre } = req.body

    if (!mar_nombre) {
        return res.status(500).send({ message: "Debe llenar todos los campos" });
    } else {
        marca = marcaModel.agregar_marca(mar_nombre);
        marca.then(function (data) {
            console.log('agregado');
            return res.status(200).send({ marca: data });
        })
    }
}

controller.verEditarMarca = (req, res) => {
    const { id } = req.params;

    marca = marcaModel.buscar_marca(id);
    marca.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Prueba no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarMarca = (req, res) => {
    var id = req.params.id
    const { mar_nombre } = req.body;
    console.log('entro');
    if (mar_nombre) {
        marca = marcaModel.editar_marca(id, mar_nombre).then(function (prueba) {
            if (!prueba) {
                console.log('error en edicion 1');
                return res.status(404).send({ message: "No se pudo actualizar la marca" });
            } else {
                console.log('editado');
                return res.status(200).send({ pruebas: prueba });
            }
        })
    } else {
        console.log('error en edicion 2');
        return res.status(200).send({ message: "Existen campos vacios" });
    }
}

controller.eliminarMarca = async (req, res) => {
    const { id } = req.params;

    try {
        await marcaModel.eliminar_marca(id).then(function (prueba) {
            if (prueba) {
                console.log('borrado');
                return res.status(200).send({ marca: prueba });
            } else {
                return res.status(500).send({ message: "Error borrando la marca" });
            }
        });
    } catch (e) {
        res.status(200).send({ message: "No se puede eliminar registro, debido a que esta indexado en otras tablas" });
    }


}

module.exports = controller;