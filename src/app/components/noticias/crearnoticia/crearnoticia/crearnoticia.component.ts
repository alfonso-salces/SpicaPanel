import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NoticiasService } from '../../../../services/noticias/noticias.service';
import { CategoriasService } from '../../../../services/categorias/categorias.service';
import { Global } from '../../../../services/global/global';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crearnoticia',
  templateUrl: './crearnoticia.component.html',
  styleUrls: ['./crearnoticia.component.scss']
})
export class CrearnoticiaComponent implements OnInit {

  fichero: File = null;
  categorias: any[];
  autor: Usuario;

  // tslint:disable-next-line:max-line-length
  constructor(private sanitizer: DomSanitizer, private noticiasservice: NoticiasService, private authservice: AuthService, private global: Global, private toastr: ToastrService, private categoriasservice: CategoriasService, private router: Router) {
    this.form = new FormGroup({
      html: new FormControl(),
      image: new FormControl(),
      titular: new FormControl(),
      categoria_id: new FormControl(),
    });
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  // tslint:disable-next-line:member-ordering
  form: FormGroup;

  // tslint:disable-next-line:member-ordering
  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph']],
      ['insert', ['table', 'link', 'video', 'hr']],
    ],
  };

  onFileSelected(event) {
    this.fichero = <File>event.target.files[0];
    this.form.get('image').setValue(this.fichero, this.fichero.name);
  }

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }

  cargarAutor() {
    this.autor = this.authservice.extraertoken();
  }

  cargarCategorias() {
    this.categoriasservice.getCategories().subscribe(
      res => {
        this.categorias = res as any[];
      },
      error => {
        console.log(error);
      }
    );
  }

  publicarNoticia() {
    this.cargarAutor();
    this.noticiasservice.createNew(this.autor.id, this.form.value, this.fichero).subscribe(
      res => {
        this.toastr.success(res.toString());
      },
      error => {
        this.toastr.error('Ha ocurrido un error.');
      }
    );
  }

}
