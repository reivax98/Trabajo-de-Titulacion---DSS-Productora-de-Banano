var express = require('express');
var api = express.Router();


const controladorEmpleado = require('../controllers/controladorEmpleado.js');
var auth = require('../middlewares/auth.js');

api.get('/get_empleado/', auth.verificarToken, controladorEmpleado.obtenerEmpleado)
api.post('/agregar_empleado', auth.verificarToken, controladorEmpleado.agregarEmpleado)
api.get('/vereditar_empleado/:id', auth.verificarToken, controladorEmpleado.verEditarEmpleado)
api.put('/editar_empleado/:id', auth.verificarToken, controladorEmpleado.editarEmpleado)
api.delete('/eliminar_empleado/:id', auth.verificarToken, controladorEmpleado.eliminarEmpleado)

module.exports = api;