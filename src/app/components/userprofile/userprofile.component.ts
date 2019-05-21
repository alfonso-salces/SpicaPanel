import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  providers: [AuthService],
})
export class UserprofileComponent implements OnInit {

  usuarioActivo: Usuario;

  editProfileForm = new FormGroup({
    nick: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    image: new FormControl(''),
  });

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

  onSubmit() {
    this.serverErrorMessages = '';
    this.authservice.editProfile(this.editProfileForm.value).subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('/profile');
        this.editProfileForm.reset();
      },
      error => {
        console.log(error);
        this.serverErrorMessages = error.error.message;
      }
    );
  }

}
