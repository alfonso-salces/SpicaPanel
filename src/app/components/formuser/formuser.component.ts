import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-formuser',
  templateUrl: './formuser.component.html',
  styleUrls: ['./formuser.component.scss']
})
export class FormuserComponent implements OnInit {
  @Input() editar: boolean;
  @Input() crear: boolean;
  @Output() refrescar = new EventEmitter<any>();
  fichero: File = null;
  usuarioActivo: Usuario;

  EditUserForm = new FormGroup({
    nick: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    rol: new FormControl('admin'),
    image: new FormControl(),
  });

  CreateUserForm = new FormGroup({
    nick: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    rol: new FormControl('admin'),
    image: new FormControl(),
  });

  showSuccessMessage = false;
  serverErrorMessages: string;
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private authservice: AuthService, private usuariosservice: UsuariosService) { }

  ngOnInit() { }

  cargarDatos() {
    this.usuarioActivo = this.authservice.extraertoken();
  }

  limpiarMensaje() {
    this.showSuccessMessage = false;
    this.serverErrorMessages = '';
  }

  onFileSelectedEdit(event) {
    this.fichero = <File>event.target.files[0];
    this.EditUserForm.get('image').setValue(this.fichero, this.fichero.name);
  }

  onFileSelectedCreate(event) {
    this.fichero = <File>event.target.files[0];
    this.CreateUserForm.get('image').setValue(this.fichero, this.fichero.name);
  }

  onSubmit() {

    if (this.fichero != null) {
      this.showSuccessMessage = false;
      this.authservice.editProfile(this.EditUserForm.value, this.fichero).subscribe(
        res => {
          this.serverErrorMessages = '';
          this.showSuccessMessage = true;
          this.EditUserForm.reset();
          this.authservice.deleteToken();
          this.authservice.setToken(res['token']);
          this.refrescar.emit('true');
        },
        err => {
          console.log(err);
          this.serverErrorMessages = err.error.errors[0].mesage;
        }

      );
    } else {
      this.authservice.editProfile(this.EditUserForm.value, null).subscribe(
        res => {
          this.serverErrorMessages = '';
          this.showSuccessMessage = true;
          this.EditUserForm.reset();
          this.authservice.deleteToken();
          this.authservice.setToken(res['token']);
          this.refrescar.emit('true');
        },
        err => {
          console.log(err);
          this.serverErrorMessages = err.error.errors[0].message;
        }
      );
    }
  }

  onCreate() {
    if (this.fichero != null) {
      this.showSuccessMessage = false;
      this.usuariosservice.createUser(this.CreateUserForm.value, this.fichero).subscribe(
        res => {
          this.serverErrorMessages = '';
          this.showSuccessMessage = true;
          this.CreateUserForm.reset();
          this.refrescar.emit('true');
        },
        err => {
          console.log(err);
          this.serverErrorMessages = err.error.errors[0].mesage;
        }
      );
    } else {
      this.serverErrorMessages = 'Introduce una imagen, por favor.';
    }
  }

}
