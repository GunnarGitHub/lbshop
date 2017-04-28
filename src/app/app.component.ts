import { DatabaseService } from './common/services/database.service';
import { Component, OnInit } from '@angular/core';
import { User } from './common/model'

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'LB Shop'
  
  constructor(private databaseService: DatabaseService) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit ");
  }

  private loggedIn() : User {
    return this.databaseService.loggedIn();
  }
}

