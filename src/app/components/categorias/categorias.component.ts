import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Global } from 'src/app/services/global/global';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriasService } from '../../services/categorias/categorias.service';

declare var $;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categorias: any[];
  fichero: File = null;
  ficheroEdit: File = null;

  selectedCategory: any;

  showSuccessMessage = false;
  showSuccessMessageCreate = false;
  serverErrorMessages: string;

  CreateCategoryForm = new FormGroup({
    nombre: new FormControl(''),
    image: new FormControl(),
  });

  EditCategoryForm = new FormGroup({
    nombre: new FormControl(''),
    image: new FormControl(),
  });

  filterCategory = '';

  constructor(private global: Global, private toastr: ToastrService, private categoriasservice: CategoriasService) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cambiarOrden() {
    this.categorias.reverse();
  }

  onFileSelectedEdit(event) {
    this.fichero = <File>event.target.files[0];
    this.EditCategoryForm.get('image').setValue(this.fichero, this.fichero.name);
  }

  onFileSelectedCreate(event) {
    this.fichero = <File>event.target.files[0];
    this.CreateCategoryForm.get('image').setValue(this.fichero, this.fichero.name);
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

  eliminarCategoria(categoria, i) {
    this.categoriasservice.deleteCategory(categoria.id).subscribe(
      res => {
        this.toastr.success('Categoría eliminada correctamente.')
        this.categorias.splice(i, 1);
      },
      error => {
        this.toastr.error('Ha ocurrido un error.')
      }
    );
  }

  onEdit() {
    if (this.ficheroEdit != null) {
      this.showSuccessMessage = false;
      this.categoriasservice.editCategory(this.selectedCategory.id, this.EditCategoryForm, this.ficheroEdit).subscribe(
        res => {
          this.serverErrorMessages = '';
          this.ficheroEdit = null;
          this.CreateCategoryForm.reset();
          this.cargarCategorias();
          this.toastr.success('¡Categoría creada correctamente!')
        },
        error => {
          this.toastr.error('Ha ocurrido un error.');
        }
      );
    } else {

    }
  }

  editarCategoria(categoria, i) {
    this.selectedCategory = categoria;
    this.EditCategoryForm.get('nombre').setValue(categoria.nombre);
  }

  onCreate() {
    if (this.fichero != null) {
      this.showSuccessMessage = false;
      this.categoriasservice.createCategory(this.CreateCategoryForm.value, this.fichero).subscribe(
        res => {
          this.serverErrorMessages = '';
          this.showSuccessMessageCreate = true;
          this.fichero = null;
          this.CreateCategoryForm.reset();
          this.cargarCategorias();
          this.toastr.success('¡Categoría creada correctamente!')
        },
        err => {
          this.toastr.error('Ha ocurrido un error.');
        }
      );
    } else {
      this.serverErrorMessages = 'Introduce una imagen, por favor.';
    }
  }

}
