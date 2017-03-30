import { Component, OnInit, Input } from '@angular/core';

import { Department } from '../../common/model';

@Component({
  selector: 'list-departments-with-items',
  templateUrl: './list-departments-with-items.component.html',
  styleUrls: ['./list-departments-with-items.component.css']
})
export class ListDepartmentsWithItemsComponent implements OnInit {

@Input() departments: Department[] = [];


  constructor( ) {
    console.log("constructor ");
   }
  
  ngOnInit() {
  }

}
