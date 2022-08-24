const exportadoraModel = require('../models/exportadora')

const controller = {};

controller.obtenerExportadora = (req, res) => {

    exportadoras = exportadoraModel.get_exportadora()

    exportadoras.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarExportadora = (req, res) => {

    const { exp_nombre, exp_descripcion, exp_ruc, exp_direccion, exp_telefono1, exp_telefono2 } = req.body

    if (!exp_nombre) {
        return res.status(500).send({ message: "Debe llenar el campo de nombre" });
    } else {
        exportadora = exportadoraModel.agregar_exportadora(exp_nombre, exp_descripcion, exp_ruc, exp_direccion, exp_telefono1, exp_telefono2);
        exportadora.then(function (data) {
            console.log('agregado');
            return res.status(200).send({ exportadoras: data });
        })
    }
}

controller.verEditarExportadora = (req, res) =>{
    const { id } = req.params;
    
    exportadora = exportadoraModel.buscar_exportadora(id);
    exportadora.then(function(datos){
        if(!datos){
            return  res.status(404).send({message:"Exportadora no existe"}); 
        }else{
            return res.status(200).send(datos)
        }
    }) 
}

controller.editarExportadora = (req, res) => {
    var id = req.params.id
    const { exp_nombre, exp_descripcion, exp_ruc, exp_direccion, exp_telefono1, exp_telefono2 } = req.body;
    console.log('entro');
    if (exp_nombre) {
        exportadora = exportadoraModel.editar_exportadora(id, exp_nombre, exp_descripcion, exp_ruc, exp_direccion, exp_telefono1, exp_telefono2).then(function (expor) {
            if (!expor) {
                console.log('error en edicion');
                return res.status(404).send({ message: "No se pudo actualizar la exportadora" });
            } else {
                console.log('editado');
                return res.status(200).send({ exportadoras: expor });
            }
        })
    } else {
        console.log('error en edicion');
        return res.status(200).send({ message: "Existen campos vacios" });
    }
}

controller.eliminarExportadora = async (req, res) => {
    const { id } = req.params;

    try {
        await exportadoraModel.eliminar_exportadora(id).then(function (expor) {
            if (expor) {
                console.log('borrado');
                return res.status(200).send({ exportadoras: expor });
            } else {
                return res.status(500).send({ message: "Error borrando la exportadora" });
            }
        })
    } catch (e) {
        res.status(200).send({ message: "No se puede eliminar registro, debido a que esta indexado en otras tablas" });
    }
}

module.exports = controller;