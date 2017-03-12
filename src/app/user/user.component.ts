import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

import { User } from '../common/model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
  //,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  @Input()
  user: User;

  constructor() {
  };

  ngOnInit() {
    console.log("UserComponent ngOnInit ");
  };
}
