import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token: string;
  idusuario: string;

  readonly URL_API = 'http://localhost:3000/api';
  readonly URL_IMG = 'http://localhost:3000/public/img/uploads/usuarios/';

  constructor(private http: HttpClient, private router: Router, private authservice: AuthService) { }

  getUsers() {
    return this.http.get(this.URL_API + '/users', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }

  getUser(id) {
    let cuerpo = new FormData();
    cuerpo.append('id', id);
    return this.http.get(this.URL_API + '/profile', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }

  createUser(credenciales, fichero) {
    let cuerpo = new FormData();
    cuerpo.append('nick', credenciales['nick']);
    cuerpo.append('email', credenciales['email']);
    cuerpo.append('password', credenciales['password']);
    cuerpo.append('nombre', credenciales['nombre']);
    cuerpo.append('rol', credenciales['rol']);
    cuerpo.append('image', fichero, fichero.name);
    return this.http.post(this.URL_API + '/register', cuerpo, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }


  editUser(id, credenciales, fichero) {
    if (fichero != null) {
      const editProfile = new FormData();
      editProfile.append('nick', credenciales['nick']);
      editProfile.append('email', credenciales['email']);
      editProfile.append('password', credenciales['password']);
      editProfile.append('nombre', credenciales['nombre']);
      editProfile.append('image', fichero, fichero.name);
      return this.http.put(this.URL_API + '/users/' + id, editProfile, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
      });
    } else {
      const editProfile = new FormData();
      editProfile.append('nick', credenciales['nick']);
      editProfile.append('email', credenciales['email']);
      editProfile.append('password', credenciales['password']);
      editProfile.append('nombre', credenciales['nombre']);
      return this.http.put(this.URL_API + '/users/' + id, editProfile, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
      });
    }
  }

  deleteUser(id) {
    return this.http.delete(this.URL_API + '/users/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }

}
