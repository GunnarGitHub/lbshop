import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { by } from 'protractor';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';


import { DatabaseService } from './../services';
import { Item } from '../model';

@Component({
  selector: 'edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, AfterViewInit {

  @Input('group')
  private itemForm: FormGroup;

  key: string = "dummy"

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit ")// + this.itemForm.controls.['items'].controls.length);
    this.key = this.itemForm.get('$key').value
    console.log('ngOnInit key ' + this.key) //JSON.stringify(this.itemForm.get('$key').value))
    console.log("after ngOnInit ")
  }

  ngAfterViewInit() {
    let el = document.getElementById(this.key)
    console.log('ngAfterViewInit el ' + el)
    el.addEventListener('dragstart', this.dragStartHandler)
    el.addEventListener('dragend', (e) => {
      e.preventDefault();
    })
    //console.log('ngAfterViewInit..');
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
    //event.dataTransfer.effectAllowed = 'move'; // only allow moves
    event.dataTransfer.dropEffect = "move"
  }

  dropHandler(event) {
    console.log('dropHandler ')
    event.preventDefault();
    let internalDNDType = 'text/plain';
    console.log('dropHandler ' + event.dataTransfer.getData(internalDNDType))
    let $key = event.dataTransfer.getData(internalDNDType);
    console.log('dropHandler' + $key)
  }

}
