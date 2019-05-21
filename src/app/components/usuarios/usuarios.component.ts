import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuario: any;
  usuarios: any[];

  constructor(private authservice: AuthService, private router: Router, private usuariosservice: UsuariosService) { }

  ngOnInit() {
    this.cargarUsuarios();
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
