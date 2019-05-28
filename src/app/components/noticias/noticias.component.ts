import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias/noticias.service';
import { Global } from '../../services/global/global';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  noticias: any[];
  notic: any[];

  filterNew = '';
  _sanitizer: DomSanitizer;

  // tslint:disable-next-line:max-line-length
  constructor(private noticiasservice: NoticiasService, private global: Global, private toastr: ToastrService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.cargarNoticias();
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


  cambiarOrden() {
    this.noticias.reverse();
  }

  verNoticia(noticia) {
    this._sanitizer = this.sanitizer;
    this.notic = noticia;
  }

  editarNoticia(noticia) {
    this.noticiasservice.setNoticia(noticia);
    this.router.navigateByUrl('/editarnoticia');
  }

  eliminarNoticia(noticia) {
    this.noticiasservice.deleteNew(noticia.id).subscribe(
      res => {
        this.toastr.success('Noticia eliminada correctamente.');
        this.noticias.splice(this.noticias.indexOf(noticia), 1);
      },
      error => {
        this.toastr.error('Ha ocurrido un error.');
      }
    );
  }

}
