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

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.usuarioActivo = this.authservice.extraertoken();
  }

}
