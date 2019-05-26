import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class UsuariosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
    const resultUsers = [];
    for (const user of value) {
      if (user.nick.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUsers.push(user);
      }
    }
    return resultUsers;
  }

}
