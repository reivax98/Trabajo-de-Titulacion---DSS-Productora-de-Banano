var express = require('express');
var api = express.Router();

const controladorHacienda = require('../controllers/controladorHacienda.js');
var auth = require('../middlewares/auth.js');

api.get('/get_hacienda/', auth.verificarToken, controladorHacienda.obtenerHacienda)
api.post('/agregar_hacienda', auth.verificarToken, controladorHacienda.agregarHacienda)
api.get('/vereditar_hacienda/:id', auth.verificarToken, controladorHacienda.verEditarHacienda)
api.put('/editar_hacienda/:id', auth.verificarToken, controladorHacienda.editarHacienda)
api.delete('/eliminar_hacienda/:id', auth.verificarToken, controladorHacienda.eliminarHacienda)

module.exports = api;