var express = require('express');
var api = express.Router();

const controladorTrazabilidad = require('../controllers/controladorTrazabilidad.js');
var auth = require('../middlewares/auth.js');

api.get('/get_tzsiembra/', auth.verificarToken, controladorTrazabilidad.obtenerTzSiembra)
api.get('/get_tzcuidado/', auth.verificarToken, controladorTrazabilidad.obtenerTzCuidado)
api.get('/get_tzcosecha/', auth.verificarToken, controladorTrazabilidad.obtenerTzCosecha)

api.get('/get_tzsiembra_mes/', auth.verificarToken, controladorTrazabilidad.obtenerTzSiembraMes)
api.get('/get_tzcuidado_mes/', auth.verificarToken, controladorTrazabilidad.obtenerTzCuidadoMes)
api.get('/get_tzcosecha_mes/', auth.verificarToken, controladorTrazabilidad.obtenerTzCosechaMes)

module.exports = api;