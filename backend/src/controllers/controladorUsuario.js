const usuarioModel = require('../models/usuario');
const bcrypt = require("bcrypt");
const jwt = require('../services/jwtoken');
const nodemailer = require('nodemailer');
const jwt2 = require('jsonwebtoken');


const controller = {};

controller.login = (req, res) => {
    //obtiene los datos
    const { us_correo, us_clave } = req.body;
    console.log(us_correo + ' ' + us_clave)
    let usuario = usuarioModel.obtenerPorEmail(us_correo);
    usuario.then(function (user) {
        if (user) {
            //compara la password
            console.log('entro al proceso');
            bcrypt.compare(us_clave, user.us_clave).then(function (samePassword) {
                if (!samePassword) {
                    console.log(us_clave);
                    console.log(user.us_clave);
                    console.log('entro al proceso 1');
                    return res.status(500).send({ message: 'Contraseña incorrecta' });
                } else {
                    if (req.body.gettoken) {
                        console.log('entro al proceso 2');
                        return res.status(200).send({ token: jwt.obtenerToken(user) })
                    } else {
                        console.log('proceso user');
                        return res.status(200).send({ user });
                    }

                }
            })
        } else {
            return res.status(500).send({ message: "El correo no pertenece a ninguna cuenta" });
        }
    }).catch(function (error) {
        console.log(error)
        return res.status(500).send({ message: "Error autenticando usuario" });
    });

}


controller.register = async (req, res) => {
    //obtiene los datos
    const { nombre, apellido, email, telefono, genero, rol, clave } = req.body;

    //vacios
    if (!nombre || !apellido || !email || !telefono || !genero || !rol || !clave) {
        return res.status(200).send({ message: "Debe rellenar todo los campos" });
    } else {
        //comprobar duplicados
        user_e = await usuarioModel.obtenerPorEmail(email);
        if (!user_e) {
            //encriptar password
            bcrypt.hash(clave, 10).then(function (hashedPassword) {
                //insertar usuario
                usuarioModel.insertar(nombre, apellido, email, nick, hashedPassword, telefono, rol)
                    .then(function (datosUsuario) {
                        if (!datosUsuario) {
                            usuario = usuarioModel.obtenerPorEmail(email);
                            usuario.then(function (user) {
                                return res.status(200).send({ user });
                            })
                        } else {
                            return res.status(200).send({ message: "Error al crear cuenta" });
                        }
                    })
            })
                .catch(function (error) {
                    console.log(error)
                    return res.status(500).send({ message: "Error insertando usuario" });
                })
        } else {
            if (user_e) {
                return res.status(200).send({ message: 'El email ya esta registrados' });
            } else {
                return res.status(200).send({ message: 'Error' });
            }
        }
    }
}

controller.forgotPassword = async (req, res) => {
    const { us_correo } = req.body;

    if (!us_correo) {
        return res.status(400).send({ message: 'Email requerido' });
    }

    const message = 'Revisa el link que llego a tu correo para resetear tu contraseña'
    let verificationLink;
    let emailstatus = 'OK'

    let usuario = usuarioModel.obtenerPorEmail(us_correo);

    try {
        usuario.then(async function (user) {
            if (user) {
                //compara la password
                console.log('entro al proceso');
                const token = jwt2.sign({ userId: user.us_id, email: user.us_correo }, 'secret2', { expiresIn: '10m' });
                verificationLink = `http://localhost:4200/new-password/${token}`;
                user.us_resettoken = token
                res.json({ message, info: emailstatus, test: verificationLink })
            } else {
                return res.status(500).send({ message: "El correo no pertenece a ninguna cuenta" });
            }

            try {
                let transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "banasoft.adm2022@gmail.com",
                        pass: "ldsyvycsmbkkoubf"
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                let message_email = {
                    from: "banasoft.adm2022@gmail.com",
                    to: us_correo,
                    subject: "Solicitud de cambio de contraseña",
                    text: "Ingrese al siguiente enlace para cambiar su contraseña: " + verificationLink
                }

                transport.sendMail(message_email, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('enviado')
                        console.log(info);
                    }
                })
            } catch (error) {
                emailstatus = error
                return res.status(500).json({ message })
            }

            try {
                await usuarioModel.agregarResetToken(user.us_id, user.us_resettoken);
            } catch (error) {
                emailstatus = error;
                return res.status(500).json({ message: emailstatus })
            }
        })
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}


controller.createNewPassword = async (req, res) => {
    const { newpassword } = req.body;
    const us_resettoken = req.headers['reset'];
    if (!(us_resettoken && newpassword)) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    let jwtPayload;

    try {
        jwtPayload = jwt2.verify(us_resettoken, 'secret2');
        user = await usuarioModel.buscarResetToken(us_resettoken);

        user.us_clave = newpassword

        try {
            bcrypt.hash(user.us_clave, 10).then(function (hashedPassword) {
                usuarioModel.resetPassword(user.us_id, hashedPassword);
            })
            console.log('clave actualizada')
            return res.status(200).json({ message: 'Clave actualizada' })
        } catch (error) {
            return res.status(400).send({ message: 'Error al actualizar' })
        }

    } catch {
        console.log('clave error')
        return res.status(500).send({ message: 'Solicitud de cambio no existente' })
    }

}

controller.obtenerUsuario = (req, res) => {

    usuario = usuarioModel.get_usuario()

    usuario.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarUsuario = async (req, res) => {

    const { us_nombres, us_apellidos, us_correo, us_telefono, us_genero, us_rol, us_clave } = req.body

    if (!us_nombres || !us_apellidos || !us_correo || !us_telefono || !us_genero || !us_rol || !us_clave) {
        return res.status(200).send({ message: "Debe rellenar todo los campos" });
    } else {
        user_e = await usuarioModel.obtenerPorEmail(us_correo);
        if (!user_e) {
            //encriptar password
            bcrypt.hash(us_clave, 10).then(function (hashedPassword) {
                //insertar usuario
                usuarioModel.agregar_usuario(us_nombres, us_apellidos, us_correo, us_telefono, us_genero, us_rol, hashedPassword)
                    .then(function (datosUsuario) {
                        if (!datosUsuario) {
                            usuario = usuarioModel.obtenerPorEmail(us_correo);
                            usuario.then(function (user) {
                                return res.status(200).send({ user });
                            })
                        } else {
                            return res.status(200).send({ message: "Error al crear cuenta" });
                        }
                    })
            })
                .catch(function (error) {
                    console.log(error)
                    return res.status(500).send({ message: "Error insertando usuario" });
                })
        } else {
            if (user_e) {
                return res.status(200).send({ message: 'El email ya esta registrados' });
            } else {
                return res.status(200).send({ message: 'Error' });
            }
        }
    }
}

controller.verEditarUsuario = (req, res) => {
    const { id } = req.params;

    usuario = usuarioModel.buscar_usuario(id);
    usuario.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Usuario no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarUsuario = async (req, res) => {
    var id = req.params.id
    const { us_nombres, us_apellidos, us_correo, us_telefono, us_genero, us_rol, us_clave } = req.body;
    console.log('entro');
    if (!us_nombres || !us_apellidos || !us_correo || !us_telefono || !us_genero || !us_rol || !us_clave) {
        return res.status(200).send({ message: "Debe rellenar todo los campos" });
    } else {
        user_e = await usuarioModel.obtenerPorEmail(us_correo);
        user_i = await usuarioModel.obtenerId(id);
        if (!user_e) {
            if (user_i.us_clave == us_clave) {
                usuarioModel.editar_usuario(id, us_nombres, us_apellidos, us_correo, us_telefono, us_genero, us_rol, us_clave)
                    .then(function (usr) {
                        if (!usr) {
                            console.log('error en edicion 1');
                            return res.status(404).send({ message: "No se pudo actualizar al usuario" });
                        } else {
                            console.log('editado 1');
                            return res.status(200).send({ usuario: usr });
                        }
                    })
            }
            else {
                bcrypt.hash(us_clave, 10).then(function (hashedPassword) {
                    //insertar usuario
                    usuarioModel.editar_usuario(id, us_nombres, us_apellidos, us_correo, us_telefono, us_genero, us_rol, hashedPassword)
                        .then(function (usr) {
                            if (!usr) {
                                console.log('error en edicion 1');
                                return res.status(404).send({ message: "No se pudo actualizar al usuario" });
                            } else {
                                console.log('editado 1');
                                return res.status(200).send({ usuario: usr });
                            }
                        })
                })
                    .catch(function (error) {
                        console.log(error)
                        return res.status(500).send({ message: "Error editando usuario" });
                    })
            }
        }
        else {
            if (user_e) {
                if (user_i.us_correo == us_correo) {
                    if (user_i.us_clave == us_clave) {
                        usuarioModel.editar_usuario(id, us_nombres, us_apellidos, us_correo, us_telefono, us_genero, us_rol, us_clave)
                            .then(function (usr) {
                                if (!usr) {
                                    console.log('error en edicion 1');
                                    return res.status(404).send({ message: "No se pudo actualizar al usuario" });
                                } else {
                                    console.log('editado 1');
                                    return res.status(200).send({ usuario: usr });
                                }
                            })
                    }
                    else {
                        bcrypt.hash(us_clave, 10).then(function (hashedPassword) {
                            //insertar usuario
                            usuarioModel.editar_usuario(id, us_nombres, us_apellidos, us_correo, us_telefono, us_genero, us_rol, hashedPassword)
                                .then(function (usr) {
                                    if (!usr) {
                                        console.log('error en edicion 1');
                                        return res.status(404).send({ message: "No se pudo actualizar al usuario" });
                                    } else {
                                        console.log('editado 1');
                                        return res.status(200).send({ usuario: usr });
                                    }
                                })
                        })
                            .catch(function (error) {
                                console.log(error)
                                return res.status(500).send({ message: "Error editando usuario" });
                            })
                    }
                }
                else {
                    return res.status(200).send({ message: 'El email ya esta registrado, elija otro' });
                }
            } else {
                return res.status(200).send({ message: 'Error' });
            }
        }
    }
}

controller.eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    user_e = await usuarioModel.obtenerId(id);
    if (!user_e) {
        usuarioModel.eliminar_usuario(id).then(function (usr) {
            if (usr) {
                console.log('borrado');
                return res.status(200).send({ user: usr });
            } else {
                return res.status(500).send({ message: "Error borrando al usuario" });
            }
        });
    }
    else {
        if (user_e) {
            return res.status(200).send({ message: 'El usuario no puede eliminarse a sí mismo' });
        } else {
            return res.status(200).send({ message: 'Error' });
        }
    }

}

module.exports = controller;