const empleadoModel = require('../models/empleado')

const controller = {};

controller.obtenerEmpleado = (req, res) => {

    empleado = empleadoModel.get_empleado()

    empleado.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarEmpleado = (req, res) => {

    const { emp_nombre_completo } = req.body

    if (!emp_nombre_completo) {
        return res.status(500).send({ message: "Debe llenar el campo de nombre" });
    } else {
        empleado = empleadoModel.agregar_empleado(emp_nombre_completo);
        empleado.then(function (data) {
            console.log('agregado');
            return res.status(200).send({ empleados: data });
        })
    }
}

controller.verEditarEmpleado = (req, res) =>{
    const { id } = req.params;
    
    empleado = empleadoModel.buscar_empleado(id);
    empleado.then(function(datos){
        if(!datos){
            return  res.status(404).send({message:"Empleado no existe"}); 
        }else{
            return res.status(200).send(datos)
        }
    }) 
}

controller.editarEmpleado = (req, res) => {
    var id = req.params.id
    const { emp_nombre_completo } = req.body;
    console.log('entro');
    if (emp_nombre_completo) {
        empleado = empleadoModel.editar_empleado(id, emp_nombre_completo).then(function (emp) {
            if (!emp) {
                console.log('error en edicion');
                return res.status(404).send({ message: "No se pudo actualizar la exportadora" });
            } else {
                console.log('editado');
                return res.status(200).send({ empleados: emp });
            }
        })
    } else {
        console.log('error en edicion');
        return res.status(200).send({ message: "Existen campos vacios" });
    }
}

controller.eliminarEmpleado = async (req, res) => {
    const { id } = req.params;

    try {
        await empleadoModel.eliminar_empleado(id).then(function (emp) {
            if (emp) {
                console.log('borrado');
                return res.status(200).send({ empleados: emp });
            } else {
                return res.status(200).send({ message: "Error borrando al empleado" });
            }
        })
    } catch (e) {
        res.status(200).send({ message: "No se puede eliminar registro, debido a que esta indexado en otras tablas" });
    }
    
}

controller.obtenerPrueba = (req, res) => {

    empleados = empleadoModel.get_prueba()

    empleados.then(function (datos) {
        return res.status(200).json({ datos })
    })
}

controller.agregarPrueba = (req, res) => {

    const { nombre, email, anios, fecha } = req.body

    if (!nombre || !email || !anios || !fecha) {
        return res.status(500).send({ message: "Debe llenar todos los campos" });
    } else {
        empleado = empleadoModel.agregar_prueba(nombre, email, anios, fecha);
        empleado.then(function (data) {
            //console.log(data);
            console.log('agregado');
            return res.status(200).send({ pruebas: data });
        })

    }
}

controller.vereditar = (req, res) => {
    const { id } = req.params;

    empleado = empleadoModel.buscar(id);
    empleado.then(function (datos) {
        if (!datos) {
            return res.status(404).send({ message: "Prueba no existe" });
        } else {
            return res.status(200).send(datos)
        }
    })
}

controller.editarPrueba = (req, res) => {
    var id = req.params.id
    const { nombre, email, anios, fecha } = req.body;
    console.log('entro');
    if (nombre || email || anios || fecha) {
        empleado = empleadoModel.editar_prueba(id, nombre, email, anios, fecha).then(function (prueba) {
            if (!prueba) {
                console.log('error en edicion');
                return res.status(404).send({ message: "No se pudo actualizar la prueba" });
            } else {
                console.log('editado');
                return res.status(200).send({ pruebas: prueba });
            }
        })
    } else {
        console.log('error en edicion');
        return res.status(200).send({ message: "Existen campos vacios" });
    }
}

controller.eliminarPrueba = (req, res) => {
    const { id } = req.params;

    empleadoModel.eliminar_prueba(id).then(function (prueba) {
        if (prueba) {
            console.log('borrado');
            return res.status(200).send({ pruebas: prueba });
        } else {
            return res.status(500).send({ message: "Error borrando la prueba" });
        }
    });
}

module.exports = controller;