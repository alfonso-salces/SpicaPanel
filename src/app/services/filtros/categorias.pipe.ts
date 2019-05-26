import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class CategoriasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
    const resultCategories = [];
    for (const category of value) {
      if (category.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultCategories.push(category);
      }
    }
    return resultCategories;
  }

}
