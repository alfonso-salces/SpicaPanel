import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  orden: any;
  usuario: any;
  usuarios: any[];
  fichero: File = null;

  showSuccessMessage = false;
  serverErrorMessages: string;
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  UserForm = new FormGroup({
    nick: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    image: new FormControl(),
  });

  constructor(private usuariosservice: UsuariosService, private authservice: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }


  onFileSelected(event) {
    this.fichero = <File>event.target.files[0];
    this.UserForm.get('image').setValue(this.fichero, this.fichero.name);
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

  limpiarFormulario() {
    this.UserForm.reset();
    this.serverErrorMessages = '';
    this.showSuccessMessage = false;
  }

  eliminarUsuario(user, i) {
    this.usuariosservice.deleteUser(user.id).subscribe(
      res => {
        this.toastr.success("¡Usuario eliminado correctamente!");
        this.usuarios.splice(i, 1);
        this.cargarUsuarios();
      },
      error => {
        this.toastr.error("Ha ocurrido un error.");
      }
    )
  }

  onSubmit() {
    if (this.fichero != null) {
      this.showSuccessMessage = false;
      this.usuariosservice.editUser(this.usuario.id, this.UserForm.value, this.fichero).subscribe(
        res => {
          this.serverErrorMessages = '';
          this.showSuccessMessage = true;
          this.UserForm.reset();
          this.toastr.success("¡Usuario creado correctamente!");
        },
        err => {
          console.log(err);
          this.toastr.success("Ha ocurrido un error.");
        }
      );
    } else {
      this.serverErrorMessages = 'Introduce una imagen, por favor.';
    }
  }

  editarUsuario(user) {
    this.usuario = user;
    console.log(user);
  }

}
