import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ModeradorGuard implements CanActivate {
  usuario: Usuario;
  constructor(private authservice: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.usuario = this.authservice.extraertoken();
    if (this.usuario.rol !== 'moderador' && this.usuario.rol !== 'admin') {
      console.log('No tienes permiso para estar aqui.');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
