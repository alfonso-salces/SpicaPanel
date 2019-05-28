import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { CrearnoticiaComponent } from './components/noticias/crearnoticia/crearnoticia/crearnoticia.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AuthGuard } from './services/guards/auth.guard';
import { RedactorGuard } from './services/guards/redactor.guard';
import { ModeradorGuard } from './services/guards/moderador.guard';
import { EditarnoticiaComponent } from './components/noticias/editarnoticia/editarnoticia.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: UserprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [RedactorGuard]
  },
  {
    path: 'comentarios',
    component: ComentariosComponent,
    canActivate: [ModeradorGuard]
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
    canActivate: [RedactorGuard]
  },
  {
    path: 'crearnoticia',
    component: CrearnoticiaComponent,
    canActivate: [RedactorGuard]
  },
  {
    path: 'editarnoticia',
    component: EditarnoticiaComponent,
    canActivate: [RedactorGuard]
  },
  {
    path: 'notificaciones',
    component: NotificacionesComponent,
    canActivate: [RedactorGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [ModeradorGuard]
  },
  {
    path: 'not-found',
    component: NotfoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
