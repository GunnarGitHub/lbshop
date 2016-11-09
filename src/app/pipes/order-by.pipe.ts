import { by } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: Array<any>, args?: any): any {
    array.sort((a: any, b:any) =>  {
      if (a.order < b.order) {return -1};
      if (a.order == b.order) {return 0};
      if (a.order > b.order) {return 1};
    });
    return array;
  };
}

