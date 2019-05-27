import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias/noticias.service';
import { Global } from '../../services/global/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  noticias: any[];
  notic: any[];
  orden: any;

  filterNew = '';

  constructor(private noticiasservice: NoticiasService, private global: Global, private toastr: ToastrService) { }

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
    if (this.orden === false) {
      this.noticias.reverse();
    } else {
      this.orden = false;
      this.noticias.reverse();
    }

  }

  verNoticia(noticia) {
    this.noticiasservice.getNew(noticia.id).subscribe(
      res => {
        this.notic = res as any;
      },
      error => {
        console.log(error)
      }
    );
  }

  editarNoticia(noticia) {

  }

  eliminarNoticia(noticia) {
    this.noticiasservice.deleteNew(noticia.id).subscribe(
      res => {
        this.toastr.success("Noticia eliminada correctamente.")
        this.noticias.splice(this.noticias.indexOf(noticia), 1);
      },
      error => {
        this.toastr.error("Ha ocurrido un error.")
      }
    );
  }

}
