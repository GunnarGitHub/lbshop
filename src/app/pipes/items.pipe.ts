import { Pipe, PipeTransform } from '@angular/core';
import { Item, Department } from '../model';

@Pipe({
  name: 'itemsPipe'
})
export class ItemsPipe implements PipeTransform {

 transform(items: Item[], department: Department): any {
    console.log("ItemsPipe before ITEMS "); // + JSON.stringify(items));
    let result: Item[] = items.filter(item => item.owner == department.$key);
     console.log("ItemsPipe after "); // + JSON.stringify(result));
     return result;
  }
}
