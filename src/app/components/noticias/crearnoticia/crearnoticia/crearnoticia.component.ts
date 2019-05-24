import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NoticiasService } from '../../../../services/noticias/noticias.service';
import { Global } from '../../../../services/global/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crearnoticia',
  templateUrl: './crearnoticia.component.html',
  styleUrls: ['./crearnoticia.component.scss']
})
export class CrearnoticiaComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private noticiasservice: NoticiasService, private global: Global, private toastr: ToastrService) {
    this.form = new FormGroup({
      html: new FormControl(),
      image: new FormControl()
    });
  }

  ngOnInit() {
  }

  form: FormGroup;

  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph']],
      ['insert', ['table', 'link', 'video', 'hr', 'picture']],
    ],
  };

  editorDisabled = false;

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }

  enableEditor() {
    this.editorDisabled = false;
  }

  disableEditor() {
    this.editorDisabled = true;
  }

}
