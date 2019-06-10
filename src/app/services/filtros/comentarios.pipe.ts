import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterComment"
})
export class ComentariosPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    // tslint:disable-next-line:curly
    if (arg === "" || arg.length < 3) return value;
    const resultComments = [];
    for (const comment of value) {
      if (comment.cuerpo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultComments.push(comment);
      }
    }
    return resultComments;
  }
}
