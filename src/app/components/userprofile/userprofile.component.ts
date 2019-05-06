import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  providers: [AuthService],
})
export class UserprofileComponent implements OnInit {

  usuariologged;

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.cargardatos();
  }

  cargardatos() {
    this.usuariologged = this.authservice.loggedUser;
    console.log(this.usuariologged);
  }

}
