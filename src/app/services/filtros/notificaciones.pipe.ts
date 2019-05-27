import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNotification'
})
export class NotificacionesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
    const resultNotifications = [];
    for (const notification of value) {
      if (notification.titulo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultNotifications.push(notification);
      }
    }
    return resultNotifications;
  }
}
