import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  private URL = 'http://localhost:3000/api';

  constructor(
    public _http: HttpClient,
    private userService: UserService
  ) { }

  /***************************---DASHBOARD---***************************/
  getIngresos(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_ingresos', {headers: headers});
  }

  getEgresos(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_egresos', {headers: headers});
  }

  getIngresoReciente(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_ingresoreciente', {headers: headers});
  }

  getEgresoReciente(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_egresoreciente', {headers: headers});
  }

  getMayorProveedor(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_mayorproveedor', {headers: headers});
  }

  getIngresosAnuales(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_ingresos_anio', {headers: headers});
  }

  getIngresosMensuales(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_ingresos_mensuales', {headers: headers});
  }

  getEgresosMensuales(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_egresos_mensuales', {headers: headers});
  }

  
  /***************************---TRAZABILIDAD---***************************/
  
  getSiembra(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_tzsiembra', {headers: headers});
  }

  getCuidado(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_tzcuidado', {headers: headers});
  }

  getCosecha(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_tzcosecha', {headers: headers});
  }


  /***************************---TABLA EMPLEADO---***************************/
  getEmpleado(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_empleado', {headers: headers});
  }

  addEmpleado(token: any, empleado: any):Observable<any>{
    let params = JSON.stringify(empleado);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_empleado', params, {headers: headers});
  }

  getEditEmpleado(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_empleado/'+ id, {headers: headers});
  }

  editEmpleado(id: Int32Array | null, empleado: any):Observable<any>{
    let params = JSON.stringify(empleado);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_empleado/'+ id, params, {headers: headers});
  }

  deleteEmpleado(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_empleado/'+ id, {headers: headers});
  }

  /***************************---TABLA EXPORTADORA---***************************/
  getExportadora(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_exportadora', {headers: headers});
  }

  addExportadora(token: any, exportadora: any):Observable<any>{
    let params = JSON.stringify(exportadora);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_exportadora', params, {headers: headers});
  }

  getEditExportadora(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_exportadora/'+ id, {headers: headers});
  }

  editExportadora(id: Int32Array | null, exportadora: any):Observable<any>{
    let params = JSON.stringify(exportadora);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_exportadora/'+ id, params, {headers: headers});
  }

  deleteExportadora(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_exportadora/'+ id, {headers: headers});
  }

  /***************************---TABLA FACTURA PROVEEDOR---***************************/
  getFacProveedor(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_facproveedor', {headers: headers});
  }

  addFacProveedor(token: any, fac_proveedor: any):Observable<any>{
    let params = JSON.stringify(fac_proveedor);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_facproveedor', params, {headers: headers});
  }

  getEditFacProveedor(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_facproveedor/'+ id, {headers: headers});
  }

  editFacProveedor(id: Int32Array | null, fac_proveedor: any):Observable<any>{
    let params = JSON.stringify(fac_proveedor);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_facproveedor/'+ id, params, {headers: headers});
  }

  deleteFacProveedor(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_facproveedor/'+ id, {headers: headers});
  }

  getDetFacProveedor(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_detalle_facproveedor/'+ id, {headers: headers});
  }

  addFacProveedorDetalle(token: any, facprov_detalle: any):Observable<any>{
    let params = JSON.stringify(facprov_detalle);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_detalle_facproveedor', params, {headers: headers});
  }

  getEditFacProveedorDetalle(token: any, facprov_detalle: any):Observable<any>{
    let params = JSON.stringify(facprov_detalle);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_detalle_facproveedor/'+ params , {headers: headers});
  }

  editFacProveedorDetalle(id: Int32Array | null, facprov_detalle: any, nuevofacprov_detalle: any):Observable<any>{
    let params = JSON.stringify(facprov_detalle);
    let params2 = JSON.stringify(nuevofacprov_detalle);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_detalle_facproveedor/'+ params, params2, {headers: headers});
  }

  deleteFacProveedorDetalle(token: any, facprov_detalle: any):Observable<any>{
    let params = JSON.stringify(facprov_detalle);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_detalle_facproveedor/'+ params, {headers: headers});
  }

  /***************************---TABLA FACTURACION---***************************/
  getFacturacion(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_facturacion', {headers: headers});
  }

  addFacturacion(token: any, facturacion: any):Observable<any>{
    let params = JSON.stringify(facturacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_facturacion', params, {headers: headers});
  }

  getEditFacturacion(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_facturacion/'+ id, {headers: headers});
  }

  editFacturacion(id: Int32Array | null, facturacion: any):Observable<any>{
    let params = JSON.stringify(facturacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_facturacion/'+ id, params, {headers: headers});
  }

  deleteFacturacion(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_facturacion/'+ id, {headers: headers});
  }

  getDetFacturacion(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_detalle_facturacion/'+ id, {headers: headers});
  }

  addDetFacturacion(token: any, detfacturacion: any):Observable<any>{
    let params = JSON.stringify(detfacturacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_detalle_facturacion', params, {headers: headers});
  }

  getDetEditFacturacion(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_detalle_facturacion/'+ id, {headers: headers});
  }

  editDetFacturacion(id: Int32Array | null, detfacturacion: any):Observable<any>{
    let params = JSON.stringify(detfacturacion);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_detalle_facturacion/'+ id, params, {headers: headers});
  }

  /***************************---TABLA HACIENDA---***************************/
  getHacienda(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_hacienda', {headers: headers});
  }

  addHacienda(token: any, hacienda: any):Observable<any>{
    let params = JSON.stringify(hacienda);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_hacienda', params, {headers: headers});
  }

  getEditHacienda(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_hacienda/'+ id, {headers: headers});
  }

  editHacienda(id: Int32Array | null, hacienda: any):Observable<any>{
    let params = JSON.stringify(hacienda);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_hacienda/'+ id, params, {headers: headers});
  }

  deleteHacienda(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_hacienda/'+ id, {headers: headers});
  }

  /***************************---TABLA MARCA---***************************/
  getMarca(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_marca', {headers: headers});
  }

  addMarca(token: any, marca: any):Observable<any>{
    let params = JSON.stringify(marca);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_marca', params, {headers: headers});
  }

  getEditMarca(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_marca/'+ id, {headers: headers});
  }

  editMarca(id: Int32Array | null, marca: any):Observable<any>{
    let params = JSON.stringify(marca);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_marca/'+ id, params, {headers: headers});
  }

  deleteMarca(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_marca/'+ id, {headers: headers});
  }

  /***************************---TABLA PAGO---***************************/
  getPago(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_pago', {headers: headers});
  }

  addPago(token: any, pago: any):Observable<any>{
    let params = JSON.stringify(pago);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_pago', params, {headers: headers});
  }

  getEditPago(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_pago/'+ id, {headers: headers});
  }

  editPago(id: Int32Array | null, pago: any):Observable<any>{
    let params = JSON.stringify(pago);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_pago/'+ id, params, {headers: headers});
  }

  deletePago(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_pago/'+ id, {headers: headers});
  }

  getPagoReporte(token: any, sem: number | null, anio: number | null ):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_pago_reporte/'+sem+'/'+anio, {headers: headers});
  }

  getPagoSemana(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_pago_semana', {headers: headers});
  }

  getPagoAnio(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_pago_anio', {headers: headers});
  }

  getEmpleadoOrden(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_empleado_orden', {headers: headers});
  }


  /***************************---TABLA PROVEEDOR---***************************/
  getProveedor(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_proveedor', {headers: headers});
  }

  addProveedor(token: any, proveedor: any):Observable<any>{
    let params = JSON.stringify(proveedor);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_proveedor', params, {headers: headers});
  }

  getEditProveedor(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_proveedor/'+ id, {headers: headers});
  }

  editProveedor(id: Int32Array | null, proveedor: any):Observable<any>{
    let params = JSON.stringify(proveedor);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_proveedor/'+ id, params, {headers: headers});
  }

  deleteProveedor(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_proveedor/'+ id, {headers: headers});
  }

  getProveedorOrden(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_proveedor_orden', {headers: headers});
  }

  /***************************---TABLA TIPO CAJA---***************************/
  getTipoCaja(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_tipocaja', {headers: headers});
  }

  addTipoCaja(token: any, tipo_caja: any):Observable<any>{
    let params = JSON.stringify(tipo_caja);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_tipocaja', params, {headers: headers});
  }

  getEditTipoCaja(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_tipocaja/'+ id, {headers: headers});
  }

  editTipoCaja(id: Int32Array | null, tipo_caja: any):Observable<any>{
    let params = JSON.stringify(tipo_caja);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_tipocaja/'+ id, params, {headers: headers});
  }

  deleteTipoCaja(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_tipocaja/'+ id, {headers: headers});
  }

  /***************************---TABLA LISTA USUARIO---***************************/
  getListaUsuario(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_listausuario', {headers: headers});
  }

  addListaUsuario(token: any, usuario: any):Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.post(this.URL + '/agregar_usuario', params, {headers: headers});
  }

  getEditListaUsuario(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/vereditar_listausuario/'+ id, {headers: headers});
  }

  editListaUsuario(id: Int32Array | null, lista_usuario: any):Observable<any>{
    let params = JSON.stringify(lista_usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', this.userService.getToken());
    return this._http.put(this.URL + '/editar_usuario/'+ id, params, {headers: headers});
  }

  deleteListaUsuario(token: any, id: Int32Array | null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.URL + '/eliminar_usuario/'+ id, {headers: headers});
  }
}
