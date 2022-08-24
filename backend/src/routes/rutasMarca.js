var express = require('express');
var api = express.Router();

const controladorMarca = require('../controllers/controladorMarca.js');
var auth = require('../middlewares/auth.js');

api.get('/get_marca/', auth.verificarToken, controladorMarca.obtenerMarca)
api.post('/agregar_marca', auth.verificarToken, controladorMarca.agregarMarca)
api.get('/vereditar_marca/:id', auth.verificarToken, controladorMarca.verEditarMarca)
api.put('/editar_marca/:id', auth.verificarToken, controladorMarca.editarMarca)
api.delete('/eliminar_marca/:id', auth.verificarToken, controladorMarca.eliminarMarca)

module.exports = api;