import { Component, OnInit } from "@angular/core";
import { UsuariosService } from "../../services/usuarios/usuarios.service";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Global } from "src/app/services/global/global";
import { Usuario } from "src/app/models/usuario";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.scss"]
})
export class UsuariosComponent implements OnInit {
  orden: any;
  usuario: any;
  usuarios: any[];
  fichero: File = null;
  ficheroCrear: File = null;
  usuarioActivo: Usuario;
  token: any;

  showSuccessMessage = false;
  showSuccessMessageCreate = false;
  serverErrorMessages: string;
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  UserForm = new FormGroup({
    nick: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    nombre: new FormControl("", Validators.required),
    rol: new FormControl("", Validators.required),
    image: new FormControl()
  });

  CreateUserForm = new FormGroup({
    nick: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    nombre: new FormControl("", Validators.required),
    rol: new FormControl("", Validators.required),
    image: new FormControl()
  });

  filterUser = "";

  // tslint:disable-next-line:max-line-length
  constructor(
    private usuariosservice: UsuariosService,
    private authservice: AuthService,
    private toastr: ToastrService,
    private global: Global
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  onFileSelected(event) {
    this.fichero = <File>event.target.files[0];
    this.UserForm.get("image").setValue(this.fichero, this.fichero.name);
  }

  onFileSelectedCreate(event) {
    this.ficheroCrear = <File>event.target.files[0];
    this.CreateUserForm.get("image").setValue(
      this.ficheroCrear,
      this.ficheroCrear.name
    );
  }

  cargarUsuarios() {
    this.usuariosservice.getUsers().subscribe(
      res => {
        this.usuarios = res as any[];
      },
      error => {
        console.log(error);
      }
    );
  }

  cargarUsuarioActivo() {
    this.usuarioActivo = this.authservice.extraertoken();
  }

  invertirUsuarios() {
    this.usuarios.reverse();
  }

  limpiarFormulario() {
    this.UserForm.reset();
    this.CreateUserForm.reset();
    this.UserForm.value["nick"] = "";
    this.UserForm.value["email"] = "";
    this.UserForm.value["password"] = "";
    this.UserForm.value["nombre"] = "";
    this.UserForm.value["rol"] = "";
    this.UserForm.value["image"] = "";
    this.CreateUserForm.value["nick"] = "";
    this.CreateUserForm.value["email"] = "";
    this.CreateUserForm.value["password"] = "";
    this.CreateUserForm.value["nombre"] = "";
    this.CreateUserForm.value["rol"] = "";
    this.CreateUserForm.value["image"] = "";
    this.serverErrorMessages = "";
    this.showSuccessMessage = false;
    this.showSuccessMessageCreate = false;
  }

  eliminarUsuario(user) {
    this.usuariosservice.deleteUser(user.id).subscribe(
      res => {
        this.toastr.success(JSON.stringify(res));
        this.cargarUsuarios();
      },
      error => {
        this.toastr.error("Ha ocurrido un error.");
      }
    );
  }

  onSubmit() {
    this.enviarEdicion();
  }

  enviarEdicion() {
    if (this.fichero != null) {
      this.showSuccessMessage = false;
      this.usuariosservice
        .editUser(this.usuario.id, this.UserForm.value, this.fichero)
        .subscribe(
          res => {
            this.serverErrorMessages = "";
            this.showSuccessMessage = true;
            this.limpiarFormulario();
            this.fichero = null;
            this.cargarUsuarios();
            this.toastr.success("¡Usuario editado correctamente!");
          },
          error => {
            console.log(error);
            this.serverErrorMessages = error.error["error"];
          }
        );
    } else {
      this.usuariosservice
        .editUser(this.usuario.id, this.UserForm.value, null)
        .subscribe(
          res => {
            this.serverErrorMessages = "";
            this.showSuccessMessage = true;
            this.UserForm.reset();
            this.limpiarFormulario();
            this.cargarUsuarios();
            this.toastr.success("¡Usuario editado correctamente!");
          },
          error => {
            console.log(error);
            this.serverErrorMessages = error.error["error"];
          }
        );
    }
  }

  onCreate() {
    if (this.ficheroCrear != null) {
      this.showSuccessMessage = false;
      this.usuariosservice
        .createUser(this.CreateUserForm.value, this.ficheroCrear)
        .subscribe(
          res => {
            this.serverErrorMessages = "";
            this.showSuccessMessageCreate = true;
            this.ficheroCrear = null;
            this.CreateUserForm.reset();
            this.cargarUsuarios();
            this.toastr.success("¡Usuario creado correctamente!");
            this.limpiarFormulario();
          },
          error => {
            this.serverErrorMessages = error.error["error"];
            this.toastr.error(error.error["error"]);
          }
        );
    } else {
      this.serverErrorMessages = "Introduce una imagen, por favor.";
    }
  }

  editarUsuario(user) {
    this.usuario = user;
    this.UserForm.get("nick").setValue(user.nick);
    this.UserForm.get("email").setValue(user.email);
    this.UserForm.get("nombre").setValue(user.nombre);
    this.UserForm.get("rol").setValue(user.rol);
    this.UserForm.value["nick"] = user.nick;
    this.UserForm.value["email"] = user.email;
    this.UserForm.value["password"] = user.password;
    this.UserForm.value["nombre"] = user.nombre;
    this.UserForm.value["rol"] = user.rol;
  }
}
