import { shop } from './../reducers/shop.reducer';
import { shops } from './../reducers/shops.reducer';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var firebase: any;

@Injectable()
export class DatabaseService {
  db: any;

  constructor(private af: AngularFire) {
    // Initialize Firebase
    this.db = af.database;
    this.storeInitialData();
    //this.storeShops();
    //this.storeData();
    // TODO remove 
    this.getShops();
  }

  private initialData = [
    {
      key: "maxi", owner: "gunnar", name: "Maxi", order: 1.0, departments: [
        {
          key: 'frukt', owner: 'maxi', name: 'Frukt', order: 1, items: [
            { key: "äpplen", owner: "frukt", buy: true, quantity: 1, unit: "st", name: "Äpplen", order: 1.0 },
            { key: "päron", owner: "frukt", buy: false, quantity: 1, unit: "st", name: "Päron", order: 2.0 },
          ]
        },
        {
          key: 'mejeri', owner: 'maxi', name: 'Mejeri', order: 3.5, items: [
            { key: "grädde", owner: "mejeri", buy: false, quantity: 8, unit: "st", name: "Grädde", order: 4.0 },
            { key: "mjölk", owner: "mejeri", buy: false, quantity: 7, unit: "st", name: "Mjölk", order: 3.0 },
          ]
        },
        {
          key: 'övrigt', owner: 'maxi', name: 'Övrigt', order: 4, items: [
            { key: "blommor", owner: "ovrigt", buy: false, quantity: 3, unit: "st", name: "Blommor", order: 6.0 }
          ]
        },
      ]
    },
    {
      key: "city gross", owner: "gunnar", name: "City Gross", order: 2.2, departments: [
        {
          key: 'diverse', owner: 'city gross', name: 'Diverse', order: 3, items: [
            { key: "batterier", owner: "diverse", buy: false, quantity: 9, unit: "st", name: "AA Batterier", order: 5.0 },
            { key: "lampa60", owner: "diverse", buy: false, quantity: 9, unit: "st", name: "60 W Lampa", order: 8.0 },
            { key: "lampa40", owner: "diverse", buy: false, quantity: 9, unit: "st", name: "40 W Lampa", order: 4.0 },
          ]
        }
      ],
    },
    { key: "apoteket", owner: "lena", name: "Apoteket", order: 2.2, departments: [] },
    { key: "systemet", owner: "lena", name: "Systemet", order: 2.3, departments: [] }
  ];

  private storeInitialData() {
    console.log("Database service storeInitialData");
    // remove old data
    const data$: FirebaseListObservable<any> =
      this.db.list('/');
    data$.remove();

    const shops$: FirebaseListObservable<any> = this.db.list('/shops');
    const departments$: FirebaseListObservable<any> = this.db.list('/departments');
    const items$: FirebaseListObservable<any> = this.db.list('/items');
    this.initialData.forEach(shop => {
      console.log(JSON.stringify(shop));
      const departments = shop.departments;
      shop.departments = null;
      let shopKey: string = shops$.push(shop).key
      departments.forEach(department => {
        department.owner = shopKey;
        let keyDepartment: string = departments$.push(department).key;
        const items = department.items;
        department.items = null;
        items.forEach(item => {
          item.owner = keyDepartment;
          items$.push(item);
        })
      })
    })
  };

  getShops() {
    console.log("DatabaseService getShops ");
    const shops$: FirebaseListObservable<any> = this.db.list('/shops',
      //TODO remove static query
      { query: { orderByChild: 'owner', equalTo: 'gunnar' } });
    shops$.subscribe((shops: any[]) =>
      shops.forEach(shop => {
        console.log("shop: " + JSON.stringify(shop) + " key: " + shop.$key);
      }));
  };

};

