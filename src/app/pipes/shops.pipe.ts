import { Pipe, PipeTransform } from '@angular/core';
import { User, Shop } from '../model';
@Pipe({
  name: 'shopsPipe',
  pure: true
})
export class ShopsPipe implements PipeTransform {

  transform(shops: Shop[], user: User): any {
    if (!user) {console.error("ShopsPipe no user given")}
    console.log("ShopsPipe "); // + JSON.stringify(shops));
    return shops.filter((shop) => shop.owner == user.key);
  }

}
