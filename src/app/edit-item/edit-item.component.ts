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
    let name: string = this.itemForm.get('name').value
    console.log('ngAfterViewInit name ' + JSON.stringify(name))
    if (name.length == 0 ) {
      let nameElement = document.getElementById("name"+this.key)
      nameElement.focus()
    }
    el.addEventListener('dragstart', (event) => {
      console.log('dragStartHandler ' + this.key);

      event.dataTransfer.setData(this.internalDNDType, this.key);
      event.dataTransfer.dropEffect = "move"
    })
    el.addEventListener('dragend', (event) => {
      console.log('dragend ' + this.key)
      event.preventDefault();
    })
    // handle droptarget
    el = document.getElementById('dz' + this.key)
    el.addEventListener('dragenter', (event) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      el.className="dzenter"
    })
      el.addEventListener('dragleave', (event) => {
      event.preventDefault()
      el.className="dzleave"
    })
    el.addEventListener('drop', (event: any) => {
      console.log('dropHandler ')
      let key = event.dataTransfer.getData(this.internalDNDType);;
      console.log('dropHandler' + key)
      this.databaseService.deleteItem(key)
      el.className="dzleave"
    })
    el.addEventListener('dragover', (event) => {
      //console.log('dragover ' + this.key)
      event.preventDefault()
    })
    //console.log('ngAfterViewInit..');
  }

  onChange() {
    //console.log("itemChanged " + JSON.stringify(this.itemForm.value));
    this.databaseService.updateItem(this.itemForm.value);
  }

}
