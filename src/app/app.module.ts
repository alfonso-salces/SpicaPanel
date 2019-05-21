import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { FormuserComponent } from './components/formuser/formuser.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    CategoriasComponent,
    NoticiasComponent,
    ComentariosComponent,
    NotificacionesComponent,
    HomeComponent,
    NotfoundComponent,
    UserprofileComponent,
    FormuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
