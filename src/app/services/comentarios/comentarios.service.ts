import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient, private authservice: AuthService, private global: Global) { }

  getComments() {
    return this.http.get(this.global.URL_API + '/comments');
  }

  getComment(id) {
    return this.http.get(this.global.URL_API + '/comment/' + id);
  }

  createComment(id, formulario) {
    let cuerpo = new FormData();
    cuerpo.append('cuerpo', formulario['cuerpo']);
    cuerpo.append('noticia_id', formulario['noticia_id']);
    cuerpo.append('autor_id', formulario['autor_id']);
    return this.http.post(this.global.URL_API + '/createcomment', cuerpo, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }

  editComment(id, formulario) {
    let cuerpo = new FormData();
    cuerpo.append('cuerpo', formulario['cuerpo']);
    return this.http.put(this.global.URL_API + '/editcomment/' + id, cuerpo, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }

  deleteComment(id) {
    return this.http.delete(this.global.URL_API + '/deletecomment/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }
}
