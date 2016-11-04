import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/Rx';

import { ItemsService} from '../services';
import { Item } from '../model';

@Component({
  selector: 'list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})

export class ListItemsComponent implements OnInit {

  @Input() items: Item[] = [];

  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private itemsService: ItemsService ) {
    console.log("ListItemsComponent constructor " + JSON.stringify(this.items));
  }

  ngOnInit() {
    console.log("ListItemsComponent ngOnInit " + JSON.stringify(this.items));
    this.itemForm = this.fb.group({
      key: '',
      buy: '',
      owner: '',
      quantity: '',
      unit: '',
      name: '',
      order: null
    });
    // this.itemForm
    //   .valueChanges
    //   .distinctUntilChanged()
    //   .debounceTime(5000)
    //   .subscribe(item => this.itemsService.changeItem(item));
  }

  onBlur() {
    console.log("onBlur "); // + JSON.stringify(this.itemForm.value));
    this.itemsService.changeItem(this.itemForm.value);
  }
}
