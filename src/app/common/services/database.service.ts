import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject'

import { User, Shop, Department, Item } from './../model';
declare var firebase: any;

@Injectable()
export class DatabaseService {
  public db: AngularFireDatabase;

  //GB public shops$: FirebaseListObservable<Shop[]>
  //public users$: FirebaseListObservable<any[]>
  //GB public departments$: FirebaseListObservable<any[]>
  //gbprivate shopSubject: Subject<string>
  //private departmentSubject: Subject<string>
  //GB public items$: FirebaseListObservable<Item[]>
  //GB public user = this.users[0];


  constructor(db: AngularFireDatabase) {
    // Initialize Firebase
    this.db = db;
    this.onInit()
  }

  onInit() {
    console.log('shopOwner: ' + this.loggedIn().shopOwner)
    //GB this.shopSubject = new Subject<string>()
    /*GB
    this.shops$ = this.db.list('/shops', {
      query: {
        orderByChild: 'owner',
        equalTo: this.user.shopOwner
      }
    });
    */
    // TODO remove when in production
    this.storeInitialData()
    this.storeUsers()
  }

  // TODO read from firebase GOOLE authentication 
  public loggedIn(): User {
    return this.users[1]
  }

  public itemsByOwner$(department: Department): FirebaseListObservable<Item[]> {
    return this.db.list('/items', {
      query: {
        orderByChild: 'owner',
        equalTo: department.$key
      }
    });

  }

  public departments$(): FirebaseListObservable<Department[]> {
    return this.db.list('/departments')
  }

  public items$(): FirebaseListObservable<Item[]> {
    return this.db.list('/items')
  }

  public shops$(): FirebaseListObservable<Shop[]> {
    return this.db.list('/shops')
  }

  public shopsByOwner$(user: User): FirebaseListObservable<Shop[]> {
    return this.db.list('/shops', {
      query: {
        orderByChild: 'owner',
        equalTo: user.shopOwner
      }
    });
  }

  public departmentsByOwner$(shop: Shop): FirebaseListObservable<Shop[]> {
    console.log('departmentsByOwner$ ' + JSON.stringify(shop));
    return this.db.list('/departments', {
      query: {
        orderByChild: 'owner',
        equalTo: shop.$key
      }
    });
  }

  public updateShop(shop: Shop) {
    //console.log('updateDepartment() ' + JSON.stringify(department));
    let key = shop.$key
    let newShop = Object.assign({}, shop)
    delete newShop.$key
    newShop.name = newShop.name ?
      newShop.name[0].toLocaleUpperCase() + newShop.name.substring(1) : ''
    //GB this.shops$.update(key, newShop)
    this.shops$().update(key, newShop)
  }

  public updateDepartment(department: Department) {
    //console.log('updateDepartment() ' + JSON.stringify(department));
    let key = department.$key
    let newDepartment = Object.assign({}, department)
    delete newDepartment.$key
    newDepartment.name = newDepartment.name ?
      newDepartment.name[0].toLocaleUpperCase() + newDepartment.name.substring(1) : ''
    //GB this.departments$.update(key, newDepartment)
    this.departments$().update(key, newDepartment)
  }

  public addDepartment(department: Department): string {
    //console.log('addDepartment ' + JSON.stringify(department));
    department.name = department.name ? department.name[0].toLocaleUpperCase() + department.name.substring(1) : ''
    //GB return this.departments$.push(department).key;
    return this.departments$().push(department).key;
    //console.log('addItem pushed ' +  JSON.stringify(item)) 
  }

  public updateItem(item: Item) {
    console.log('updateItem() ' + JSON.stringify(item));
    let key = item.$key
    let newItem = Object.assign({}, item)
    delete newItem.$key
    //if (newItem.exists())
    newItem.name = newItem.name ?
      newItem.name[0].toLocaleUpperCase() + newItem.name.substring(1) : ''
    //GB this.items$.update(key, newItem)
    this.items$().update(key, newItem)
  }

  public moveItem(key: string, targetElementOwner: string, newOrder: number) {
    //console.log('moveItem ' + key + '/' + targetElementOwner + '/' + newOrder)
    let itemObservable: FirebaseObjectObservable<Item> = this.db.object('/items/' + key)
    let item: Item
    itemObservable.subscribe(snapshot => {
      //console.log("moveItem snapshot " + JSON.stringify(snapshot))
      item = snapshot
    })
    delete item['$exists']
    //console.log('moveItem before ' + JSON.stringify(item)) //item.$key + '/' + item.owner + '/' + item.order)
    item = Object.assign({}, item, { $key: key, owner: targetElementOwner, order: newOrder })
    console.log('moveItem ' + JSON.stringify(item)) // + item.$key + '/' + item.owner + '/' + item.order)
    this.updateItem(item)
  }

  public addItem(item: Item) {
    //console.log('addItem() ' + JSON.stringify(item));
    item.name = item.name ? item.name[0].toLocaleUpperCase() + item.name.substring(1) : ''
    this.items$().push(item)
    //console.log('addItem pushed ' +  JSON.stringify(item)) 
  }

  public deleteItem(key: string) {
    console.log('deleteItem with key ' + JSON.stringify(key));
    let item = this.db.object('/items/' + key)
    item.remove()
    //console.log('deleteItem item ' + JSON.stringify(item));
  }

  // store users 
  private users = [
    { email: 'gunar.bos@gmail.com', name: 'Gunnar', shopOwner: 'gunar.bos@gmail.com' },
    { email: 'lena.bost@gmail.com', name: 'Lena', shopOwner: 'gunar.bos@gmail.com' }
  ];

  private storeUsers() {
    this.users.forEach(user => {
      this.db.list('/users').push(user);
    });
  }

  private initialData = [
    {
      owner: 'gunar.bos@gmail.com', name: 'Maxi', order: 10, departments: [
        {
          name: 'Frukt', order: 15, items: [
            { buy: true, quantity: 1, unit: 'st', name: 'äpplen', order: 20 },
            { buy: false, quantity: 1, unit: 'st', name: 'päron', order: 30 },
          ]
        },
        {
          name: 'Mejeri', order: 25, items: [
            { buy: false, quantity: 1, unit: 'st', name: 'Grädde', order: 40 },
            { buy: false, quantity: 2, unit: 'st', name: 'Mjölk', order: 50 },
            { buy: false, quantity: 3, unit: 'st', name: 'Smör', order: 60 },
          ]
        },
        {
          name: 'Övrigt', order: 35, items: [
            { buy: false, quantity: 3, unit: 'st', name: 'Blommor', order: 70 }
          ]
        },
      ]
    },
    {
      owner: 'gunar.bos@gmail.com', name: 'City Gross', order: 80, departments: [
        {
          name: 'Diverse', order: 45, items: [
            { buy: false, quantity: 9, unit: 'st', name: 'AA Batterier', order: 90 },
            { buy: false, quantity: 9, unit: 'st', name: '60 W Lampa', order: 100 },
            { buy: false, quantity: 9, unit: 'st', name: '40 W Lampa', order: 110 },
          ]
        },
        {
          name: 'Empty', order: 55, items: []
        }
      ],
    },
    { owner: 'lena.bost@gmail.com', name: 'Apoteket', order: 120, departments: [] },
    { owner: 'lena.bost@gmail.com', name: 'Systemet', order: 130, departments: [] }
  ];

  private storeInitialData() {
    console.log('storeInitialData');
    // remove old data
    const data$: FirebaseListObservable<any> =
      this.db.list('/');
    data$.remove();

    let shs$ = this.db.list('/shops');
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
        let keyDepartment: string = this.addDepartment(department);
        items.forEach(item => {
          //item['owner'] = keyDepartment;
          // console.log('item ' + JSON.stringify(item))
          this.addItem(Object.assign({}, item, { owner: keyDepartment }));
        })
      })
    })
  };

};

