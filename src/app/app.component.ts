import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './scss/app.scss'],
})
export class AppComponent {
  title = 'spica-panel';
  constructor(private elementRef: ElementRef, private router: Router, private authservice: AuthService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('.menu-izquierdo')
                                  .addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    const claseMenu = event.target.classList;
    // Selecciona el contenedor
    const contenedor = document.querySelector('.pagina'),
          flechaIzq = document.querySelector('.fa-arrow-left'),
          flechaDer = document.querySelector('.fa-arrow-right');

    if (claseMenu.contains('fa-arrow-left') ) {
         // cerrar el menĂº lateral
         contenedor.classList.add('no-menu');
         event.target.style.display = 'none';
         (<HTMLElement>document.querySelector('.fa-arrow-right')).style.display = 'block';
    } else if (claseMenu.contains('fa-arrow-right')) {
         contenedor.classList.remove('no-menu');
         event.target.style.display = 'none';
         (<HTMLElement>document.querySelector('.fa-arrow-left')).style.display = 'block';
    }
  }

  cerrarsesion() {
    sessionStorage.removeItem('token');
    this.authservice.loggedUser = undefined;
    this.router.navigateByUrl('/');
  }
}
