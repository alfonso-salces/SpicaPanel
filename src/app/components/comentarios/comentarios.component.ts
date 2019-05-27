import { Component, OnInit } from '@angular/core';
import { ComentariosService } from 'src/app/services/comentarios/comentarios.service';
import { NoticiasService } from 'src/app/services/noticias/noticias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {

  comentarios: any[];
  noticias: any[];
  filterComment = '';
  autor: Usuario;

  CreateCommentForm = new FormGroup({
    cuerpo: new FormControl(''),
    noticia_id: new FormControl(''),
    autor_id: new FormControl(''),
  });

  constructor(private authservice: AuthService, private comentariosservice: ComentariosService, private noticiasservice: NoticiasService, private toastr: ToastrService) { }

  ngOnInit() {
    this.cargarComentarios();
    this.cargarAutor();
  }

  cargarComentarios() {
    this.comentariosservice.getComments().subscribe(
      res => {
        this.comentarios = res as any[];
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarAutor() {
    this.autor = this.authservice.extraertoken();
  }

  cargarNoticias() {
    this.noticiasservice.getNews().subscribe(
      res => {
        this.noticias = res as any[];
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarComentario(comentario) {
    this.comentariosservice.deleteComment(comentario.id).subscribe(
      res => {
        this.comentarios.splice(this.comentarios.indexOf(comentario), 1);
        this.toastr.success('Comentario eliminado correctamente');
      },
      error => {
        this.toastr.error('Ha ocurrido un error');
      }
    )
  }

  onCreate() {
    this.comentariosservice.createComment(this.autor.id, this.CreateCommentForm.value).subscribe(
      res => {
        this.cargarComentarios();
        this.toastr.success(res.toString());
      },
      error => {
        this.toastr.error('Ha ocurrido un error.');
      }
    );
  }

}
