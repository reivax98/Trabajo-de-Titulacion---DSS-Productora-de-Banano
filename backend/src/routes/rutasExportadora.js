var express = require('express');
var api = express.Router();

const controladorExportadora = require('../controllers/controladorExportadora.js');
var auth = require('../middlewares/auth.js');

api.get('/get_exportadora/', auth.verificarToken, controladorExportadora.obtenerExportadora)
api.post('/agregar_exportadora', auth.verificarToken, controladorExportadora.agregarExportadora)
api.get('/vereditar_exportadora/:id', auth.verificarToken, controladorExportadora.verEditarExportadora)
api.put('/editar_exportadora/:id', auth.verificarToken, controladorExportadora.editarExportadora)
api.delete('/eliminar_exportadora/:id', auth.verificarToken, controladorExportadora.eliminarExportadora)

module.exports = api;