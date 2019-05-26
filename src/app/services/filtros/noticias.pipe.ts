import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNew'
})
export class NoticiasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === '' || arg.length < 3) return value;
    const resultNews = [];
    for (const noticia of value) {
      if (noticia.titular.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultNews.push(noticia);
      }
    }
    return resultNews;
  }

}
