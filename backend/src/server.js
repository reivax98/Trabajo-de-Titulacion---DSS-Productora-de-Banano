const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const empleado = require('./routes/rutasEmpleado')
const usuario = require('./routes/rutasUsuario')
const exportadora = require('./routes/rutasExportadora')
const facproveedor = require('./routes/rutasFac-proveedor')
const facturacion = require('./routes/rutasFacturacion')
const hacienda = require('./routes/rutasHacienda')
const marca = require('./routes/rutasMarca')
const pago = require('./routes/rutasPago')
const proveedor = require('./routes/rutasProveedor')
const tipocaja = require('./routes/rutasTipo-caja')
const dashboard = require('./routes/rutasDashboard')
const trazabilidad = require('./routes/rutasTrazabilidad')
const listausuario = require('./routes/rutasUsuario')

// middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, reset');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// rutas
app.use('/api', empleado);
app.use('/api', usuario);
app.use('/api', exportadora);
app.use('/api', facproveedor);
app.use('/api', facturacion);
app.use('/api', hacienda);
app.use('/api', marca);
app.use('/api', pago);
app.use('/api', proveedor);
app.use('/api', tipocaja);
app.use('/api', dashboard);
app.use('/api', trazabilidad);
app.use('/api', listausuario);


app.listen(3000);
console.log('Servidor en puerto', 3000);