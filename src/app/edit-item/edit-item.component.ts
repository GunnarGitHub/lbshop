import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { ItemsService} from '../services';
import { Item } from '../model';

@Component({
  selector: 'edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  @Input() item: Item;
  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private itemsService: ItemsService ) { }

  ngOnInit() {
    console.log("EditItemComponent ngOnInit ");// + JSON.stringify(this.item));
    this.itemForm = this.fb.group({
      key: '',
      buy: '',
      owner: '',
      quantity: '',
      unit: '',
      name: '',
      order: null
    });
  }

 onChange() {
    console.log("onBlur "); // + JSON.stringify(this.itemForm.value));
    this.itemsService.changeItem(this.itemForm.value);
  }
}
