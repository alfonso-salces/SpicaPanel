import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class RedactorGuard implements CanActivate {
  usuario: Usuario;
  constructor(private authservice: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.usuario = this.authservice.extraertoken();
    if (this.usuario.rol !== 'redactor' && this.usuario.rol !== 'admin') {
      console.log('No tienes permiso para estar aqui.');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
