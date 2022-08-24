const trazabilidadModel = require('../models/trazabilidad')

const controller = {};

controller.obtenerTzSiembra = (req, res) => {

    trazabilidad = trazabilidadModel.get_tzSiembra()

    trazabilidad.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerTzCuidado = (req, res) => {

    trazabilidad = trazabilidadModel.get_tzCuidado()

    trazabilidad.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerTzCosecha = (req, res) => {

    trazabilidad = trazabilidadModel.get_tzCosecha()

    trazabilidad.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerTzSiembraMes = (req, res) => {

    trazabilidad = trazabilidadModel.get_tzSiembra_Mes()

    trazabilidad.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerTzCuidadoMes = (req, res) => {

    trazabilidad = trazabilidadModel.get_tzCuidado_Mes()

    trazabilidad.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerTzCosechaMes = (req, res) => {

    trazabilidad = trazabilidadModel.get_tzCosecha_Mes()

    trazabilidad.then(function (datos) {
        return res.status(200).json({ datos })
    })
}


module.exports = controller;