import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject'

import { Shop, Department } from './../model/model';
declare var firebase: any;

@Injectable()
export class DatabaseService {
  db: any;

  private shop: Shop;
  public shops$: FirebaseListObservable<Shop[]>;
  public users$: FirebaseListObservable<any[]>;
  public departments$: FirebaseListObservable<any[]>;
  private shopSubject: Subject<string>
  private departmentSubject: Subject<string>

  constructor(private af: AngularFire) {
    // Initialize Firebase
    this.db = af.database;
    this.onInit()
  }

  onInit() {
    console.log('shopOwner: ' + this.user.shopOwner)
    this.shopSubject = new Subject<string>()
    this.departmentSubject = new Subject<string>()
    this.shops$ = this.db.list('/shops', {
      query: {
        orderByChild: 'owner',
        equalTo: this.user.shopOwner
      }
    });

    this.storeInitialData()
    this.storeUsers()
  }

  shopIschanged(shop) {
    this.shop = shop
    this.shopSubject.next(shop.$key)
  }

  public getDepartmentsObservable(): FirebaseListObservable<any[]> {
    return this.db.list('/departments', {
      query: {
        orderByChild: 'owner',
        equalTo: this.shopSubject
      }
    })
  }

  public getItemsObservable(): FirebaseListObservable<any[]> {
    return this.db.list('/items', {
      query: {
        orderByChild: 'owner',
        equalTo: this.departmentSubject
      }
    });
  }

  public departmentChanged(department: Department) {
    this.departmentSubject.next(department.$key)
  }

  private users = [
    { email: 'gunar.bos@gmail.com', name: 'Gunnar', shopOwner: 'gunar.bos@gmail.com' },
    { email: 'lena.bost@gmail.com', name: 'Lena', shopOwner: 'gunar.bos@gmail.com' }
  ];

  public user = this.users[0];

  private storeUsers() {
    let usrs$ = this.db.list('/users')
    this.users.forEach(user => {
      usrs$.push(user);
    });
  }

  private initialData = [
    {
      owner: 'gunar.bos@gmail.com', name: 'Maxi', order: 1.0, departments: [
        {
          name: 'Frukt', owner: '', order: 1, items: [
            { buy: true, owner: '', quantity: 1, unit: 'st', name: 'Äpplen', order: 1.0 },
            { buy: false, owner: '', quantity: 1, unit: 'st', name: 'Päron', order: 2.0 },
          ]
        },
        {
          owner: '', name: 'Mejeri', order: 3.5, items: [
            { buy: false, owner: 'mejeri', quantity: 8, unit: 'st', name: 'Grädde', order: 4.0 },
            { buy: false, owner: 'mejeri', quantity: 7, unit: 'st', name: 'Mjölk', order: 3.0 },
          ]
        },
        {
          owner: '', name: 'Övrigt', order: 4, items: [
            { buy: false, owner: 'ovrigt', quantity: 3, unit: 'st', name: 'Blommor', order: 6.0 }
          ]
        },
      ]
    },
    {
      owner: 'gunar.bos@gmail.com', name: 'City Gross', order: 2.2, departments: [
        {
          owner: '', name: 'Diverse', order: 3, items: [
            { buy: false, owner: '', quantity: 9, unit: 'st', name: 'AA Batterier', order: 5.0 },
            { buy: false, owner: '', quantity: 9, unit: 'st', name: '60 W Lampa', order: 8.0 },
            { buy: false, owner: '', quantity: 9, unit: 'st', name: '40 W Lampa', order: 4.0 },
          ]
        }
      ],
    },
    { owner: 'lena.bost@gmail.com', name: 'Apoteket', order: 2.2, departments: [] },
    { owner: 'lena.bost@gmail.com', name: 'Systemet', order: 2.3, departments: [] }
  ];

  private storeInitialData() {
    console.log('Database service storeInitialData');
    // remove old data
    const data$: FirebaseListObservable<any> =
      this.db.list('/');
    data$.remove();

    let shs$ = this.db.list('/shops');
    let deps$ = this.db.list('/departments');
    let its$ = this.db.list('/items');
    const items$: FirebaseListObservable<any> = this.db.list('/items');
    this.initialData.forEach(shop => {
      const departments = shop.departments;
      shop.departments = null;
      let shopKey: string = shs$.push(shop).key;
      departments.forEach(department => {
        department.owner = shopKey;
        let keyDepartment: string = deps$.push(department).key;
        const items = department.items;
        department.items = null;
        items.forEach(item => {
          item.owner = keyDepartment;
          its$.push(item);
        })
      })
    })
  };

};

