import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser = new Usuario();
  token: string;
  idusuario: string;
  nick: string;

  readonly URL_API = 'http://localhost:3000/api';
  readonly URL_IMG = 'http://localhost:3000/public/img/uploads/usuarios/';

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  fromData = new FormData();

  constructor (private http: HttpClient, private router: Router) {}

  login(credenciales) {
    this.fromData.delete('email');
    this.fromData.delete('password');
    this.fromData.append('email', credenciales['email']);
    this.fromData.append('password', credenciales['password']);
    return this.http.post(this.URL_API + '/login', this.fromData, this.noAuthHeader);
  }

  extraertoken() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem('token'));
    const expirationDate = helper.getTokenExpirationDate(sessionStorage.getItem('token'));
    const isExpired = helper.isTokenExpired(sessionStorage.getItem('token'));
    if (decodedToken == null) {
      return null;
    } else {
      this.idusuario = decodedToken['id'];
      this.loggedUser.nombre = decodedToken['nombre'];
      this.loggedUser.nick = decodedToken['nick'];
      this.loggedUser.email = decodedToken['email'];
      this.loggedUser.image = this.URL_IMG + this.idusuario + '/' + decodedToken['image'];
      this.loggedUser.rol = decodedToken['rol'];
      return decodedToken;
    }
  }

  cargarUsuario() {
    return this.loggedUser;
  }

  isLogged() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  onLogout() {
    this.deleteToken();
    this.router.navigate(['/']);
  }

  getToken() {
    this.token = sessionStorage.getItem('token');
    return this.token;
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  deleteToken() {
    sessionStorage.removeItem('token');
    this.token = '';
  }

}
