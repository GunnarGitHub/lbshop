import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { by, element } from 'protractor';
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

  @Input() id: string
  key: string = "dummy"
  dndItemKey = 'string:text/itemkey'
  dragStartKey: string

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit id " + this.id)
    this.key = this.itemForm.get('$key').value
    console.log('ngOnInit key ' + this.key)
    console.log("after ngOnInit ")
  }

  ngAfterViewInit() {
    let el = document.getElementById(this.id)
    let name: string = this.itemForm.get('name').value
    if (name.length == 0) {
      let nameElement = document.getElementById("name" + this.id)
      nameElement.focus()
    }
    el.addEventListener('dragstart', (event) => {
      this.dragStartKey = this.key
      //console.log('dragstart key ' + this.key);
      console.log('dragstart  key ' + this.dragStartKey);
      console.log('dragstart owner ' + this.itemForm.get('owner').value);
      event.dataTransfer.setData(this.dndItemKey, this.key);
      event.dataTransfer.dropEffect = "move"
    })
    el.addEventListener('dragend', (event) => {
      //console.log('dragend ' + this.key)
      event.preventDefault();
    })
    // handle droptarget
    //TODO fix dzleave
    el.addEventListener('dragenter', (event) => {
      console.log('dragenter id ' + this.id);
      let targetElement: any = event.target
      let targetElementKey = event.currentTarget[0].value
      //console.log('dragenter ' + targetElementKey + '/' + this.dragStartKey)
      // event.dataTransfer.dropEffect = "move"
      event.preventDefault()
      if (this.dragStartKey) {
        targetElement.className = "dzleave"
        console.log('dragenter set class to dzleave')
      } else {
        el.className = "dzenter"
        console.log('dragenter set class to dzenter')
      }
    })
    el.addEventListener('dragleave', (event) => {
      event.preventDefault()
      el.className = "dzleave"
    })
    el.addEventListener('drop', (event: DragEvent) => {
      console.log('drop')
      if(this.dragStartKey) {
        console.log('drop cannot drop on self')
        return
      }
      let key: string = event.dataTransfer.getData(this.dndItemKey);
      console.log('drop key ' + key)
      let order: number = +event.currentTarget[6].value
      console.log('drop order ' + order)
      let targetElementKey: string = event.currentTarget[0].value
      let targetElementOwner: string = event.currentTarget[1].value
      let targetElementOrder: number = order
      let targetElement: Element = document.getElementById(this.id)
      let nextElementOrder: number = +this.getNextFormOrder(this.id)
      console.log('dropHandler nextElement order ' + (nextElementOrder ? nextElementOrder : "null"))
      let newOrder: number =
        (nextElementOrder ? ((targetElementOrder + nextElementOrder) / 2.0) : (targetElementOrder + 100))
      console.log('dropHandler neworder ' + newOrder)
      //TODO gard for no nextElemet, calculate owner and order for the moved item and update database

      this.databaseService.moveItem(key, targetElementOwner, newOrder)
      targetElement.className = "dzleave"
    })
    el.addEventListener('dragover', (event) => {
      //console.log('dragover ' + this.key)
      event.preventDefault()
    })
  }

  getNextFormOrder(id: string): number {
    let prefix: string = id.slice(0, id.indexOf('f') + 1)
    let suffix: number = +id.slice(id.indexOf('f') + 1)
    suffix++

    let form: Element = document.getElementById(prefix + suffix)
    if (!form) return null
    return +form[6].value
  }

  onChange() {
    //console.log("itemChanged " + JSON.stringify(this.itemForm.value));
    this.databaseService.updateItem(this.itemForm.value);
  }

}
