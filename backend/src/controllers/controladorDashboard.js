const dashboardModel = require('../models/dashboard')

const controller = {};

controller.obtenerIngresos = (req, res) => {

    dashboard = dashboardModel.get_ingresos()

    dashboard.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerEgresos = (req, res) => {

    dashboard = dashboardModel.get_egresos()

    dashboard.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerIngresoReciente = (req, res) => {

    dashboard = dashboardModel.get_ingreso_reciente()

    dashboard.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerEgresoReciente = (req, res) => {

    dashboard = dashboardModel.get_egreso_reciente()

    dashboard.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerMayorProveedor = (req, res) => {

    dashboard = dashboardModel.get_mayor_proveedor()

    dashboard.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerIngresosAnuales = (req, res) => {

    dashboard = dashboardModel.get_ingresos_anio()

    dashboard.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerIngresosMensuales = (req, res) => {

    dashboard = dashboardModel.get_ingresos_x_mes()

    dashboard.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.obtenerEgresosMensuales = (req, res) => {

    dashboard = dashboardModel.get_engresos_x_mes()

    dashboard.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

module.exports = controller;