import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:3000/api';
  public token: any;
  public identity: any;

  constructor(
    public _http: HttpClient,
    private router: Router
  ) {
    this.token = null;
    this.identity = null;
  }

  registro(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.URL + '/register', params, { headers: headers });
  }

  login(user: any, gettoken: any = ''): Observable<any> {
    if (gettoken != null) {
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.URL + '/login', params, { headers: headers });
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity') as string);

    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getUser(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    return this._http.get(this.URL + '/user/' + id, { headers: headers });
  }

  getForgotPassword(email: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.URL + '/forgot-password', email, {headers: headers});
  }
  
  resetPassword(newpassword: any, resettoken: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('reset', resettoken);
    return this._http.put(this.URL + '/new-password', newpassword, {headers: headers});
  }

}
