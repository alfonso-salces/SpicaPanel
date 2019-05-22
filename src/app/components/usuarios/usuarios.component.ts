import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  orden: any;
  usuario: any;
  usuarios: any[];

  constructor(private usuariosservice: UsuariosService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.comprobarRefresco(event);
  }

  comprobarRefresco(event) {
    if (event == 'true') {
      this.cargarUsuarios();
    }
    console.log(this.usuarios);
  }

  cargarUsuarios() {
    this.usuariosservice.getUsers().subscribe(
      res => {
        this.usuarios = res as any[];
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarUsuario(user, i) {
    this.usuarios.splice(i, 1);
    this.usuariosservice.deleteUser(user.id).subscribe(
      res => {
        console.log(res);
        this.cargarUsuarios();
      },
      error => {
        console.log(error);
      }
    )
  }

}
