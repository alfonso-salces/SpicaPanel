import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  notifications: any[];
  autor = new Usuario;
  filterNotification = '';

  CreateNotificationForm = new FormGroup({
    titulo: new FormControl(''),
    cuerpo: new FormControl(''),
    autor_id: new FormControl(''),
  });

  constructor(private authservice: AuthService, private toastr: ToastrService, private notificacionesservice: NotificacionesService) { }

  ngOnInit() {
    this.cargarNotificaciones();
    this.cargarAutor();
  }

  cargarAutor() {
    this.autor = this.authservice.extraertoken();
  }

  cambiarOrden() {
    this.notifications.reverse();
  }

  cargarNotificaciones() {
    this.notificacionesservice.getNotifications().subscribe(
      res => {
        this.notifications = res as any[];
      },
      error => {
        console.log(error);
      }
    );
  }

  onCreate() {
    this.notificacionesservice.createNotification(this.autor.id, this.CreateNotificationForm.value).subscribe(
      res => {
        this.cargarNotificaciones();
        this.toastr.success('Notificación creada y enviada correctamente.');
      },
      error => {
        this.toastr.error('Ha ocurrido un error.');
      }
    )
  }

  eliminarNotificacion(notificacion) {
    this.notificacionesservice.deleteNnotification(notificacion.id).subscribe(
      res => {
        this.notifications.splice(this.notifications.indexOf(notificacion), 1);
        this.toastr.success('Notificacion eliminada correctamente.');
      },
      error => {
        this.toastr.error('Ha ocurrido un error');
      }
    )
  }

}
