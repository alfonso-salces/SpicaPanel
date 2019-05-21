import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  id_usuario;

  constructor(private route: ActivatedRoute, private authservice: AuthService, private router: Router, private usuariosservice: UsuariosService) { }

  ngOnInit() {
    this.id_usuario = this.route.snapshot.params.id;
    this.cargarUsuario(this.id_usuario);
  }

  cargarUsuario(id) {
    this.usuariosservice.getUser(id).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

}
