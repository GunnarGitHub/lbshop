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
    { key: 'frukt', owner: 'maxi', name: 'Frukt', order: 1 },
    { key: 'mejeri', owner: 'maxi', name: 'Mejeri', order: 2 },
    { key: 'diverse', owner: 'city gross', name: 'Diverse', order: 3 },
    { key: 'övrigt', owner: 'maxi', name: 'Övrigt', order: 4 }
  ]

  private storeDepartments() {
    console.log("Database service storeDepartments");
    const departments$: FirebaseListObservable<any> =
      this.db.list('/departments');
    departments$.remove();
    this.initialDepartments.forEach(department => {
      departments$.push(department);
    })
  };


  storeData() {
    let key = this.db.ref('/shops').push().key;
    this.db.ref('/shops/' + key).update({ name: 'ica', location: 'Birsta' })
  };

  getShops() {
    console.log("DatabaseService getShops ");
    const shops$: FirebaseListObservable<any> =
      this.db.list('/shops');
    shops$.subscribe((shops: any[]) =>
      shops.forEach(shop => {
        console.log("shop: " + JSON.stringify(shop) + " key: " + shop.$key);
      }));
  };

};

