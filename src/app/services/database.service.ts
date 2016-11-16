import { Injectable } from '@angular/core';

declare var firebase: any;

@Injectable()
export class DatabaseService {


  constructor() { }

  fbData() {
    console.log("DatabaseService fbData ");
    firebase.database().ref('/').on("child_added", snapshot => {
      console.log("snap: " + snapshot.val());
    });
  }

}
