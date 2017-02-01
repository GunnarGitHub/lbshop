import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { by } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';


import { DatabaseService } from './../services';
import { Item } from '../model';

@Component({
  selector: 'edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  @Input('group')
  private itemForm: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit ")// + this.itemForm.controls.['items'].controls.length);
    let el = document.getElementById('source')
    console.log('ngOnInit ' + JSON.stringify(this.itemForm.get('$key').value))
    el.addEventListener('dragstart', this.dragStartHandler);
    console.log("after ngOnInit ")
  }


  onChange() {
    //console.log("itemChanged " + JSON.stringify(this.itemForm.value));
    this.databaseService.updateItem(this.itemForm.value);
  }

  dragStartHandler(event) {
    event.preventDefault();
    console.log('dragStartHandler ' + JSON.stringify(event.currentTarget["0"].defaultValue));
    let internalDNDType = 'text/plain';
    event.dataTransfer.setData(internalDNDType, event.currentTarget["0"].defaultValue);
    event.dataTransfer.effectAllowed = 'move'; // only allow moves
  }

  dropHandler(event) {
    let internalDNDType = 'text/plain';
    console.log('dropHandler ' + event.dataTransfer.getData(internalDNDType))
    let $key = event.dataTransfer.getData(internalDNDType);
    console.log('dropHandler' + $key)
  }

}
