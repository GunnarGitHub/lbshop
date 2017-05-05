import { Shop } from './../../common/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'show-shops-with-departments',
  templateUrl: './show-shops-with-departments.component.html',
  styleUrls: ['./show-shops-with-departments.component.css']
})
export class ShowShopsWithDepartmentsComponent implements OnInit {

  @Input() shops: Shop[]
  @Input() id: string

  constructor() { }

  ngOnInit() {
  }

}