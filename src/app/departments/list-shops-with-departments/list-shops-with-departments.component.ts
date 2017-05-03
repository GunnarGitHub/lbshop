import { Shop } from './../../common/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'list-shops-with-departments',
  templateUrl: './list-shops-with-departments.component.html',
  styleUrls: ['./list-shops-with-departments.component.css']
})
export class ListShopsWithDepartmentsComponent implements OnInit {
  @Input() shops: Shop[]
  @Input() id: string
  
  constructor() { }

  ngOnInit() {
  }

}
