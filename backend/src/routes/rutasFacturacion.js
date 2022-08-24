var express = require('express');
var api = express.Router();

const controladorFacturacion = require('../controllers/controladorFacturacion');
var auth = require('../middlewares/auth.js');

api.get('/get_facturacion/', auth.verificarToken, controladorFacturacion.obtenerFacturacion)
api.post('/agregar_facturacion', auth.verificarToken, controladorFacturacion.agregarFacturacion)
api.get('/vereditar_facturacion/:id', auth.verificarToken, controladorFacturacion.verEditarFacturacion)
api.put('/editar_facturacion/:id', auth.verificarToken, controladorFacturacion.editarFacturacion)
api.delete('/eliminar_facturacion/:id', auth.verificarToken, controladorFacturacion.eliminarFacturacion)

api.get('/get_detalle_facturacion/:id', auth.verificarToken, controladorFacturacion.obtenerDetalleFacturacion)
api.post('/agregar_detalle_facturacion', auth.verificarToken, controladorFacturacion.agregarDetalleFacturacion)
api.get('/vereditar_detalle_facturacion/:id', auth.verificarToken, controladorFacturacion.verEditarDetalleFacturacion)
api.put('/editar_detalle_facturacion/:id', auth.verificarToken, controladorFacturacion.editarDetalleFacturacion)

module.exports = api;