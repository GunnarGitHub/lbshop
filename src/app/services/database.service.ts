import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject'

import { Shop, Department, Item } from './../model/model';
declare var firebase: any;

@Injectable()
export class DatabaseService {
  public db: any;

  private shop: Shop
  public shops$: FirebaseListObservable<Shop[]>
  public users$: FirebaseListObservable<any[]>
  public departments$: FirebaseListObservable<any[]>
  private shopSubject: Subject<string>
  //private departmentSubject: Subject<string>
  public items$: FirebaseListObservable<Item[]>

  constructor(public af: AngularFire) {
    // Initialize Firebase
    this.db = af.database;
    this.items$ = this.db.list('/items')
    this.departments$ = this.db.list('/departments')
    this.users$ = this.db.list('/users')
    this.onInit()
  }

  onInit() {
    console.log('shopOwner: ' + this.user.shopOwner)
    this.shopSubject = new Subject<string>()
    this.shops$ = this.db.list('/shops', {
      query: {
        orderByChild: 'owner',
        equalTo: this.user.shopOwner
      }
    });

    this.storeInitialData()
    this.storeUsers()
  }

  public shopChanged(shop) {
    this.shop = shop
    this.shopSubject.next(shop.$key)
  }

  public updateDepartment(department: Department) {
    console.log('updateDepartment() ' + JSON.stringify(department));
    let key = department.$key
    let newDepartment = Object.assign({}, department)
    delete newDepartment.$key
    this.departments$.update(key, newDepartment)
  }

  public updateItem(item: Item) {
    console.log('updateItem() ' + JSON.stringify(item));
    let key = item.$key
    let newItem = Object.assign({}, item)
    delete newItem.$key
    this.items$.update(key, newItem)
  }

  public addItem(item: Item) {
    console.log('addItem() ' + JSON.stringify(item));
    this.items$.push(item)
    console.log('addItem() pushed') 
  }

  private users = [
    { email: 'gunar.bos@gmail.com', name: 'Gunnar', shopOwner: 'gunar.bos@gmail.com' },
    { email: 'lena.bost@gmail.com', name: 'Lena', shopOwner: 'gunar.bos@gmail.com' }
  ];

  public user = this.users[0];

  private storeUsers() {
    this.users.forEach(user => {
      this.users$.push(user);
    });
  }

  private initialData = [
    {
      owner: 'gunar.bos@gmail.com', name: 'Maxi', order: 1.0, departments: [
        {
          name: 'Frukt', order: 1, items: [
            { buy: true, quantity: 1, unit: 'st', name: 'Äpplen', order: 1.0 },
            { buy: false, quantity: 1, unit: 'st', name: 'Päron', order: 2.0 },
          ]
        },
        {
          name: 'Mejeri', order: 3.5, items: [
            { buy: false, quantity: 8, unit: 'st', name: 'Grädde', order: 4.0 },
            { buy: false, quantity: 7, unit: 'st', name: 'Mjölk', order: 3.0 },
          ]
        },
        {
          name: 'Övrigt', order: 4, items: [
            { buy: false, quantity: 3, unit: 'st', name: 'Blommor', order: 6.0 }
          ]
        },
      ]
    },
    {
      owner: 'gunar.bos@gmail.com', name: 'City Gross', order: 2.2, departments: [
        {
          name: 'Diverse', order: 3, items: [
            { buy: false, quantity: 9, unit: 'st', name: 'AA Batterier', order: 5.0 },
            { buy: false, quantity: 9, unit: 'st', name: '60 W Lampa', order: 8.0 },
            { buy: false, quantity: 9, unit: 'st', name: '40 W Lampa', order: 4.0 },
          ]
        },
        {
          name: 'Empty', order: 45, items: []
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
        department['owner'] = shopKey;
        const items = department.items;
        department.items = null;
        //  console.log('department ' + JSON.stringify(department))
        let keyDepartment: string = deps$.push(department).key;
        items.forEach(item => {
          item['owner'] = keyDepartment;
          // console.log('item ' + JSON.stringify(item))
          its$.push(item);
        })
      })
    })
  };

};

