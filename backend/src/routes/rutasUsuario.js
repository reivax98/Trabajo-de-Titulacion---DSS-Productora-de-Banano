var express = require('express');
var api = express.Router();

const controladorUsuario = require('../controllers/controladorUsuario.js');
var auth = require('../middlewares/auth.js');


api.post('/login', controladorUsuario.login)
api.post('/register', controladorUsuario.register)
api.put('/forgot-password', controladorUsuario.forgotPassword)
api.put('/new-password', controladorUsuario.createNewPassword)

api.get('/get_listausuario/', auth.verificarToken, controladorUsuario.obtenerUsuario)
api.get('/vereditar_listausuario/:id', auth.verificarToken, controladorUsuario.verEditarUsuario)
api.post('/agregar_usuario', auth.verificarToken, controladorUsuario.agregarUsuario)
api.put('/editar_usuario/:id', auth.verificarToken, controladorUsuario.editarUsuario)
api.delete('/eliminar_usuario/:id', auth.verificarToken, controladorUsuario.eliminarUsuario)


module.exports = api;