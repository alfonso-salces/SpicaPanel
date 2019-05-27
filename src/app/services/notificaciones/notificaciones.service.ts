import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private http: HttpClient, private authservice: AuthService, private global: Global) { }

  getNotifications() {
    return this.http.get(this.global.URL_API + '/notifications');
  }

  getNotification(id) {
    return this.http.get(this.global.URL_API + '/notification/' + id);
  }

  createNotification(id, formulario) {
    let cuerpo = new FormData();
    cuerpo.append('titulo', formulario['titulo']);
    cuerpo.append('cuerpo', formulario['cuerpo']);
    cuerpo.append('autor_id', id);
    return this.http.post(this.global.URL_API + '/createnotification', cuerpo, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }

  deleteNnotification(id) {
    return this.http.delete(this.global.URL_API + '/deletenotification/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }
}
