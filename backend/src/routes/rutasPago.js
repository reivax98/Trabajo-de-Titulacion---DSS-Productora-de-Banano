var express = require('express');
var api = express.Router();

const controladorPago = require('../controllers/controladorPago.js');
var auth = require('../middlewares/auth.js');

api.get('/get_pago/', auth.verificarToken, controladorPago.obtenerPago)
api.post('/agregar_pago', auth.verificarToken, controladorPago.agregarPago)
api.get('/vereditar_pago/:id', auth.verificarToken, controladorPago.verEditarPago)
api.put('/editar_pago/:id', auth.verificarToken, controladorPago.editarPago)
api.delete('/eliminar_pago/:id', auth.verificarToken, controladorPago.eliminarPago)
api.get('/get_pago_reporte/:sem/:anio', auth.verificarToken, controladorPago.obtenerPagoReporte)
api.get('/get_pago_semana/', auth.verificarToken, controladorPago.obtenerPagoSemanas)
api.get('/get_pago_anio/', auth.verificarToken, controladorPago.obtenerPagoAnios)
api.get('/get_empleado_orden/', auth.verificarToken, controladorPago.obtenerEmpleadoOrden)


module.exports = api;