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
  internalDNDType = 'text/key';

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit ")
    this.key = this.itemForm.get('$key').value
    console.log('ngOnInit key ' + this.key)
    console.log("after ngOnInit ")
  }

  ngAfterViewInit() {
    let el = document.getElementById(this.key)
    console.log('ngAfterViewInit el ' + el)
    el.addEventListener('dragstart', this.dragStartHandler)
    el.addEventListener('dragend', (event) => {
      console.log('dragend ' + event.dataTransfer.getData(this.internalDNDType))
      event.preventDefault();
    })
    el = document.getElementById('dz' + this.key)
    console.log('ngAfterViewInit el2 ' + el)
    el.addEventListener('dragenter', this.dragEnterHandler)
    el.addEventListener('drop', this.dropHandler)
    el.addEventListener('dragover', (event) => {
      console.log('dragover ' + event.dataTransfer.getData(this.internalDNDType))
      event.preventDefault()
    })
    //console.log('ngAfterViewInit..');
  }

  onChange() {
    //console.log("itemChanged " + JSON.stringify(this.itemForm.value));
    this.databaseService.updateItem(this.itemForm.value);
  }

  dragStartHandler(event) {
    let key: string = event.currentTarget["0"].defaultValue
    console.log('dragStartHandler ' + JSON.stringify(key));
    //event.preventDefault();

    event.dataTransfer.setData(this.internalDNDType, key);
    //event.dataTransfer.effectAllowed = 'move'; // only allow moves
    event.dataTransfer.dropEffect = "move"
    //console.log('dragStartHandler data ' + event.dataTransfer.getData("this.internalDNDType"))
    //console.log('dragStartHandler types ' + event.dataTransfer.types)
  }

  dropHandler(event) {
    console.log('dropHandler ')
    //event.preventDefault();
    //console.log('dropHandler ' + event.dataTransfer.getData(this.internalDNDType))
    let key = event.dataTransfer.getData(this.internalDNDType);
    console.log('dropHandler' + key)
    this.databaseService.deleteItem(key) // TODO
  }

  dragEnterHandler(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
    //console.log('dragEnterHandler data ' + JSON.stringify(event.dataTransfer.getData(this.internalDNDType)))
    //console.log('dragEnterHandler types ' + event.dataTransfer.types)
  }

}
