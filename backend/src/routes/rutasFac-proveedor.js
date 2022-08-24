var express = require('express');
var api = express.Router();

const controladorFacProveedor = require('../controllers/controladorFac-proveedor');
var auth = require('../middlewares/auth.js');

api.get('/get_facproveedor/', auth.verificarToken, controladorFacProveedor.obtenerFacProveedor)
api.post('/agregar_facproveedor', auth.verificarToken, controladorFacProveedor.agregarFacProveedor)
api.get('/vereditar_facproveedor/:id', auth.verificarToken, controladorFacProveedor.verEditarFacProveedor)
api.put('/editar_facproveedor/:id', auth.verificarToken, controladorFacProveedor.editarFacProveedor)
api.delete('/eliminar_facproveedor/:id', auth.verificarToken, controladorFacProveedor.eliminarFacProveedor)

api.get('/get_detalle_facproveedor/:id', auth.verificarToken, controladorFacProveedor.obtenerDetalleFacProveedor)
api.post('/agregar_detalle_facproveedor', auth.verificarToken, controladorFacProveedor.agregarFacProveedorDetalle)
api.get('/vereditar_detalle_facproveedor/:params', auth.verificarToken, controladorFacProveedor.verEditarFacProveedorDetalle)
api.put('/editar_detalle_facproveedor/:params', auth.verificarToken, controladorFacProveedor.editarFacProveedorDetalle)
api.delete('/eliminar_detalle_facproveedor/:params', auth.verificarToken, controladorFacProveedor.eliminarFacProveedorDetalle)

module.exports = api;