import { Pipe, PipeTransform } from '@angular/core';
import { Shop, Department } from  '../model';

@Pipe({
  name: 'departmentsPipe'
})
export class DepartmentsPipe implements PipeTransform {

 transform(departments: Department[], shop: Shop): any {
    console.log("departmentsPipe "); // + JSON.stringify(shop));
    if (!shop) {console.error("DepartmentsPipe no shop given")}
    return departments.filter(department => department.owner == shop.key);
  }
}
