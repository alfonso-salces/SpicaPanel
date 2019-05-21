import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { CATCH_STACK_VAR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-formuser',
  templateUrl: './formuser.component.html',
  styleUrls: ['./formuser.component.scss']
})
export class FormuserComponent implements OnInit {
  @Input() cascando: boolean;
  @Output() enviar: EventEmitter<any> = new EventEmitter();
  fichero: File = null;
  usuarioActivo: Usuario;

  editProfileForm = new FormGroup({
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

  constructor(private authservice: AuthService) { }

  ngOnInit() {
    console.log(this.cascando);
  }

  cargarDatos() {
    this.usuarioActivo = this.authservice.extraertoken();
  }

  onFileSelected(event) {
    this.fichero = <File>event.target.files[0];
    this.editProfileForm.get('image').setValue(this.fichero, this.fichero.name);
  }

  onSubmit() {
    this.enviar.emit('hola');
    if (this.fichero != null) {
      this.showSuccessMessage = false;
      this.authservice.editProfile(this.editProfileForm.value, this.fichero).subscribe(
        res => {
          this.serverErrorMessages = '';
          this.showSuccessMessage = true;
          this.editProfileForm.reset();
          this.authservice.deleteToken();
          this.authservice.setToken(res['token']);
          this.cargarDatos();
        },
        err => {
          console.log(err);
          this.serverErrorMessages = err.error.errors[0].mesage;
        }

      );
    } else {
      this.authservice.editProfile(this.editProfileForm.value, null).subscribe(
        res => {
          this.serverErrorMessages = '';
          this.showSuccessMessage = true;
          this.editProfileForm.reset();
          this.authservice.deleteToken();
          this.authservice.setToken(res['token']);
          this.cargarDatos();
        },
        err => {
          console.log(err);
          this.serverErrorMessages = err.error.errors[0].message;
        }
      );
    }
  }

}
