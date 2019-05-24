import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient, private authservice: AuthService, private global: Global) { }

  getNews() {
    return this.http.get(this.global.URL_API + '/news');
  }

  getNew(id) {
    return this.http.get(this.global.URL_API + '/newid/' + id);
  }

  createNew(formulario, fichero) {
    let cuerpo = new FormData();
    cuerpo.append('titular', formulario['titular']);
    cuerpo.append('contenido', formulario['contenido']);
    cuerpo.append('categoria_id', formulario['categoria_id']);
    cuerpo.append('autor_id', formulario['autor_id']);
    cuerpo.append('imagen', fichero, fichero.name);
    return this.http.post(this.global.URL_API + '/createnew', cuerpo, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }

  editNew(id, formulario, fichero) {
    if (fichero != null) {
      let cuerpo = new FormData();
      cuerpo.append('titular', formulario['titular']);
      cuerpo.append('contenido', formulario['contenido']);
      cuerpo.append('categoria_id', formulario['categoria_id']);
      cuerpo.append('autor_id', formulario['autor_id']);
      cuerpo.append('imagen', fichero, fichero.name);
      return this.http.put(this.global.URL_API + '/editnew/' + id, cuerpo, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
      });
    } else {
      let cuerpo = new FormData();
      cuerpo.append('titular', formulario['titular']);
      cuerpo.append('contenido', formulario['contenido']);
      cuerpo.append('categoria_id', formulario['categoria_id']);
      cuerpo.append('autor_id', formulario['autor_id']);
      return this.http.put(this.global.URL_API + '/editnew/' + id, cuerpo, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
      });
    }
  }

  deleteNew(id) {
    return this.http.delete(this.global.URL_API + '/deletenew/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authservice.getToken())
    });
  }
}
