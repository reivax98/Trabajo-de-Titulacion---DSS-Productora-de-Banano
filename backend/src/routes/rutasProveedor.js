var express = require('express');
var api = express.Router();

const controladorProveedor = require('../controllers/controladorProveedor.js');
var auth = require('../middlewares/auth.js');

api.get('/get_proveedor/', auth.verificarToken, controladorProveedor.obtenerProveedor)
api.post('/agregar_proveedor', auth.verificarToken, controladorProveedor.agregarProveedor)
api.get('/vereditar_proveedor/:id', auth.verificarToken, controladorProveedor.verEditarProveedor)
api.put('/editar_proveedor/:id', auth.verificarToken, controladorProveedor.editarProveedor)
api.delete('/eliminar_proveedor/:id', auth.verificarToken, controladorProveedor.eliminarProveedor)
api.get('/get_proveedor_orden/', auth.verificarToken, controladorProveedor.obtenerProveedorOrden)

module.exports = api;