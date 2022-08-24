var express = require('express');
var api = express.Router();

const controladorDashboard = require('../controllers/controladorDashboard.js');
var auth = require('../middlewares/auth.js');

api.get('/get_ingresos/', auth.verificarToken, controladorDashboard.obtenerIngresos)
api.get('/get_egresos/', auth.verificarToken, controladorDashboard.obtenerEgresos)
api.get('/get_ingresoreciente/', auth.verificarToken, controladorDashboard.obtenerIngresoReciente)
api.get('/get_egresoreciente/', auth.verificarToken, controladorDashboard.obtenerEgresoReciente)
api.get('/get_mayorproveedor/', auth.verificarToken, controladorDashboard.obtenerMayorProveedor)
api.get('/get_ingresos_anio/', auth.verificarToken, controladorDashboard.obtenerIngresosAnuales)
api.get('/get_ingresos_mensuales/', auth.verificarToken, controladorDashboard.obtenerIngresosMensuales)
api.get('/get_egresos_mensuales/', auth.verificarToken, controladorDashboard.obtenerEgresosMensuales)


module.exports = api;