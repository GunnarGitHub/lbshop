import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

declare var firebase: any;

@Injectable()
export class DatabaseService {
  db: any;

  constructor(private af: AngularFire) {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDo1_LTrFIec_OtXL0DVEyKb7xWK8xUDHQ",
      authDomain: "lb-shop-83664.firebaseapp.com",
      databaseURL: "https://lb-shop-83664.firebaseio.com",
      storageBucket: "lb-shop-83664.appspot.com",
      messagingSenderId: "176056224462"
    };
    firebase.initializeApp(config);
    this.db = af.database;
    this.storeDepartments();
    this.storeShops();
    //this.storeData();
  }

  private initialStores = [
    { key: "maxi", owner: "gunnar", name: "Maxi", order: 1.0 },
    { key: "city gross", owner: "gunnar", name: "City Gross", order: 2.2 },
    { key: "apoteket", owner: "lena", name: "Apoteket", order: 2.2 },
    { key: "systemet", owner: "lena", name: "Systemet", order: 2.3 }
  ];

  private storeShops() {
    this.db.ref('/shops').remove();
    this.initialStores.forEach(shop => {
      let key = this.db.ref('/shops').push().key;
      this.db.ref('/shops/' + key).update(shop);
    })
  };

  private initialDepartments = [
    { key: 'frukt', owner: 'maxi', name: 'Frukt', order: 1 },
    { key: 'mejeri', owner: 'maxi', name: 'Mejeri', order: 2 },
    { key: 'diverse', owner: 'city gross', name: 'Diverse', order: 3 },
    { key: 'övrigt', owner: 'maxi', name: 'Övrigt', order: 4 }
  ]

  private storeDepartments() {
    this.db.ref('/departments').remove();
    this.initialDepartments.forEach(department => {
      let key = this.db.ref('/departments').push().key;
      this.db.ref('/departments/' + key).update(department);
    })
  };


  storeData() {
    let key = this.db.ref('/shops').push().key;
    this.db.ref('/shops/' + key).update({ name: 'ica', location: 'Birsta' })
  };

  fbData() {
    console.log("DatabaseService fbData ");
    this.db.ref('/').on("child_added", snapshot => {
      console.log("snap: " + snapshot.val());
    });
  }

  getShops() {
    console.log("DatabaseService getShops ");
    this.db.list('/shops').map(shop => 
      console.log("shop: " +shop));
    };

    //return this.db.ref('/shops').on("child_added");
  };

