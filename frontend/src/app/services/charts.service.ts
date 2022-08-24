import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private URL = 'http://localhost:3000/api';

  constructor(
    public _http: HttpClient
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

  getSiembraMes(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_tzsiembra_mes', {headers: headers});
  }

  getCuidadoMes(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_tzcuidado_mes', {headers: headers});
  }

  getCosechaMes(token: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', token);
    return this._http.get(this.URL + '/get_tzcosecha_mes', {headers: headers});
  }
}
