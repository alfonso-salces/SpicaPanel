import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { NoticiasService } from "../../../services/noticias/noticias.service";
import { CategoriasService } from "../../../services/categorias/categorias.service";
import { Global } from "../../../services/global/global";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Usuario } from "src/app/models/usuario";
import { AuthService } from "src/app/services/auth.service";
import { validateConfig } from "@angular/router/src/config";
@Component({
  selector: "app-editarnoticia",
  templateUrl: "./editarnoticia.component.html",
  styleUrls: ["./editarnoticia.component.scss"]
})
export class EditarnoticiaComponent implements OnInit {
  fichero: File = null;
  categorias: any[];
  autor: Usuario;
  noticia: any;

  showSuccessMessage = false;
  serverErrorMessages: string;

  @ViewChild("closeAddExpenseModal") closeAddExpenseModal: ElementRef;

  // tslint:disable-next-line:max-line-length
  constructor(
    private sanitizer: DomSanitizer,
    private noticiasservice: NoticiasService,
    private authservice: AuthService,
    private global: Global,
    private toastr: ToastrService,
    private categoriasservice: CategoriasService,
    private router: Router
  ) {
    this.noticia = this.noticiasservice.getNoticia();
    this.form = new FormGroup({
      html: new FormControl(this.noticia.contenido, [
        Validators.required,
        Validators.minLength(100)
      ]),
      image: new FormControl(),
      titular: new FormControl(this.noticia.titular, Validators.required),
      categoria_id: new FormControl(
        this.noticia.categoria_id,
        Validators.required
      )
    });
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  // tslint:disable-next-line:member-ordering
  form: FormGroup;

  // tslint:disable-next-line:member-ordering
  config: any = {
    height: "200px",
    uploadImagePath: "/api/upload",
    toolbar: [
      ["misc", ["codeview", "undo", "redo", "codeBlock"]],
      [
        "font",
        [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "superscript",
          "subscript",
          "clear"
        ]
      ],
      ["fontsize", ["fontname", "fontsize", "color"]],
      ["para", ["style0", "ul", "ol", "paragraph"]],
      ["insert", ["table", "link", "video", "hr"]]
    ]
  };

  onFileSelected(event) {
    this.fichero = <File>event.target.files[0];
    this.form.get("image").setValue(this.fichero, this.fichero.name);
  }

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get("html").value);
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
    if (this.validarFormulario) {
      if (this.fichero == null) {
        this.serverErrorMessages = "Introduce una imagen, por favor.";
      } else {
        this.noticiasservice
          .editNew(
            this.noticia.id,
            this.autor.id,
            this.form.value,
            this.fichero
          )
          .subscribe(
            res => {
              this.serverErrorMessages = "";
              this.toastr.success("La noticia ha sido editada correctamente.");
              this.closeAddExpenseModal.nativeElement.click();
              this.router.navigateByUrl("/noticias");
            },
            error => {
              this.toastr.error("Ha ocurrido un error.");
            }
          );
      }
    }
  }

  validarFormulario() {
    if (this.form.valid && this.fichero != null) return true;
    else return false;
  }
}
