import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { Global } from './services/global/global';
import { NgxSummernoteModule } from 'ngx-summernote';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CrearnoticiaComponent } from './components/noticias/crearnoticia/crearnoticia/crearnoticia.component';
import { UsuariosPipe } from './services/filtros/usuarios.pipe';
import { CategoriasPipe } from './services/filtros/categorias.pipe';
import { NoticiasPipe } from './services/filtros/noticias.pipe';


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
    CrearnoticiaComponent,
    UsuariosPipe,
    CategoriasPipe,
    NoticiasPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSummernoteModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [Global],
  bootstrap: [AppComponent]
})
export class AppModule { }
