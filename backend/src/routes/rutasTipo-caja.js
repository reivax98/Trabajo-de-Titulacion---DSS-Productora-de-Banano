var express = require('express');
var api = express.Router();

const controladorTipoCaja = require('../controllers/controladorTipo-caja');
var auth = require('../middlewares/auth.js');

api.get('/get_tipocaja/', auth.verificarToken, controladorTipoCaja.obtenerTipoCaja)
api.post('/agregar_tipocaja', auth.verificarToken, controladorTipoCaja.agregarTipoCaja)
api.get('/vereditar_tipocaja/:id', auth.verificarToken, controladorTipoCaja.verEditarTipoCaja)
api.put('/editar_tipocaja/:id', auth.verificarToken, controladorTipoCaja.editarTipoCaja)
api.delete('/eliminar_tipocaja/:id', auth.verificarToken, controladorTipoCaja.eliminarTipoCaja)

module.exports = api;