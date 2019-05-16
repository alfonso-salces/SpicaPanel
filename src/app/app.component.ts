import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
})
export class AppComponent {
  title = 'spica-panel';

  usuarioActivo: Usuario;
  serverErrorMessages: string;
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private elementRef: ElementRef, private router: Router, private authservice: AuthService) {}

  onSubmit() {
    this.serverErrorMessages = '';
    this.authservice.login(this.loginForm.value).subscribe(
      res => {
        sessionStorage.setItem('token', res['token']);
        this.router.navigateByUrl('/profile');
        this.loginForm['email'] = '';
        this.loginForm['password'] = '';
        this.loginForm.reset();
      },
      error => {
        this.serverErrorMessages = error.error;
      }
    );
  }

}
