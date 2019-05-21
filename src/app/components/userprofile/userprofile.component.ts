import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  providers: [AuthService],
})
export class UserprofileComponent implements OnInit {

  usuarioActivo: Usuario;
  fichero: File = null;

  editProfileForm = new FormGroup({
    nick: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    image: new FormControl(),
  });

  showSuccessMessage: boolean = false;
  serverErrorMessages: string;
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.usuarioActivo = this.authservice.extraertoken();
  }

  onFileSelected(event) {
    this.fichero = <File>event.target.files[0];
    this.editProfileForm.get('image').setValue(this.fichero, this.fichero.name);
  }

  onSubmit() {
    if (this.fichero != null) {
      this.showSuccessMessage = false;
      this.authservice.editProfile(this.editProfileForm.value, this.fichero).subscribe(
        res => {
          this.serverErrorMessages = '';
          this.showSuccessMessage = true;
          this.router.navigateByUrl('/profile');
          this.editProfileForm.reset();
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
          this.usuarioActivo.nick = this.editProfileForm.value['nick'];
          this.usuarioActivo.email = this.editProfileForm.value['email'];
          this.usuarioActivo.nombre = this.editProfileForm.value['nombre'];
          this.router.navigateByUrl('/profile');
          this.editProfileForm.reset();
        },
        err => {
          console.log(err);
          this.serverErrorMessages = err.error.errors[0].message;
        }
      );
    }
  }

}
