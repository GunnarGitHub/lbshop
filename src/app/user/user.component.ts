import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/take';

import { Store } from "@ngrx/store";

import { User, AppState } from '../model';

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
  user$: Observable<User>;

  constructor(private store: Store<AppState>) {
    this.user$ = store.select(s => s.user);
  };

  ngOnInit() {
    this.store.take(1).subscribe(state => this.user = state.user)
    console.log("UserComponent ngOnInit ");
  };
}
