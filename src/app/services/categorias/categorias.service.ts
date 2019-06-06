import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Global } from "../global/global";

@Injectable({
  providedIn: "root"
})
export class CategoriasService {
  constructor(
    private http: HttpClient,
    private authservice: AuthService,
    private global: Global
  ) {}

  getCategories() {
    return this.http.get(this.global.URL_API + "/categories");
  }

  getCategory(id) {
    return this.http.get(this.global.URL_API + "/category/" + id);
  }

  createCategory(id, formulario, fichero) {
    const cuerpo = new FormData();
    cuerpo.append("nombre", formulario["nombre"]);
    cuerpo.append("autor_id", id);
    cuerpo.append("image", fichero, fichero.name);
    return this.http.post(this.global.URL_API + "/createCategory", cuerpo, {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + this.authservice.getToken()
      )
    });
  }

  editCategory(id, formulario, fichero) {
    if (fichero != null) {
      const cuerpo = new FormData();
      cuerpo.append("nombre", formulario["nombre"]);
      cuerpo.append("image", fichero, fichero.name);
      return this.http.put(
        this.global.URL_API + "/editcategory/" + id,
        cuerpo,
        {
          headers: new HttpHeaders().set(
            "Authorization",
            "Bearer " + this.authservice.getToken()
          )
        }
      );
    } else {
      const cuerpo = new FormData();
      cuerpo.append("nombre", formulario["nombre"]);
      return this.http.put(
        this.global.URL_API + "/editcategory/" + id,
        cuerpo,
        {
          headers: new HttpHeaders().set(
            "Authorization",
            "Bearer " + this.authservice.getToken()
          )
        }
      );
    }
  }

  deleteCategory(id) {
    return this.http.delete(this.global.URL_API + "/deletecategory/" + id, {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + this.authservice.getToken()
      )
    });
  }
}
