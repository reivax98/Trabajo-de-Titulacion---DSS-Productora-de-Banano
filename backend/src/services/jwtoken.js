const jwt = require('jsonwebtoken');

exports.obtenerToken = function (usuario) {
    payload = {
        us_id: usuario.us_id,
        us_nombres: usuario.us_nombres,
        us_apellidos: usuario.us_apellidos,
        us_correo: usuario.us_correo,
        us_telefono: usuario.us_telefono,
        us_genero: usuario.us_genero,
        us_rol: usuario.us_rol,
        us_clave: usuario.us_clave
    };

    return jwt.sign(payload, 'secret')
};