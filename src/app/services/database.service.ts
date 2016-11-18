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
    this.storeDepartments();
    this.storeShops();
    //this.storeData();
    // TODO remove 
    this.getShops();
  }

  private initialStores = [
    { key: "maxi", owner: "gunnar", name: "Maxi", order: 1.0 },
    { key: "city gross", owner: "gunnar", name: "City Gross", order: 2.2 },
    { key: "apoteket", owner: "lena", name: "Apoteket", order: 2.2 },
    { key: "systemet", owner: "lena", name: "Systemet", order: 2.3 }
  ];

  private storeShops() {
    console.log("Database service storeShops");
    const shops$: FirebaseListObservable<any> = this.db.list('/shops');
    shops$.remove();
    this.initialStores.forEach(shop => {
      shops$.push(shop);
    })
  };

  private initialDepartments = [
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
      key: 'diverse', owner: 'city gross', name: 'Diverse', order: 3, items: [
        { key: "batterier", owner: "diverse", buy: false, quantity: 9, unit: "st", name: "AA Batterier", order: 5.0 },
        { key: "lampa60", owner: "diverse", buy: false, quantity: 9, unit: "st", name: "60 W Lampa", order: 8.0 },
        { key: "lampa40", owner: "diverse", buy: false, quantity: 9, unit: "st", name: "40 W Lampa", order: 4.0 },
      ]
    },
    {
      key: 'övrigt', owner: 'maxi', name: 'Övrigt', order: 4, items: [
        { key: "blommor", owner: "ovrigt", buy: false, quantity: 3, unit: "st", name: "Blommor", order: 6.0 }
      ]
    }
  ]

  private storeDepartments() {
    console.log("Database service storeDepartments");
    const departments$: FirebaseListObservable<any> =
      this.db.list('/departments');
    departments$.remove();
    this.initialDepartments.forEach(department => {
      const items = department.items;
      department.items = null;
      departments$.push(department);
      console.log(JSON.stringify(department));
    })
  };


  storeData() {
    let key = this.db.ref('/shops').push().key;
    this.db.ref('/shops/' + key).update({ name: 'ica', location: 'Birsta' })
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

