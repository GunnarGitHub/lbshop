import { Pipe, PipeTransform } from '@angular/core';
import { Item, Department } from '../model';

@Pipe({
  name: 'itemsPipe'
})
export class ItemsPipe implements PipeTransform {

 transform(items: Item[], department: Department): any {
    console.log("ItemsPipe before " + JSON.stringify(items));
    console.log("ItemsPipe before DEPARTMENT" + JSON.stringify(department));
    if (!department) {console.error("ItemsPipe no department given")}
    let result: Item[] = items.filter(item => item.owner == department.key);
     console.log("ItemsPipe after" + JSON.stringify(result));
     return result;
  }
}
