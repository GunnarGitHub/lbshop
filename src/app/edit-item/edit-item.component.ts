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

  key: string = "dummy"
  dndItemKey = 'string:text/itemkey';
  dndDepartmentKey = 'string:text/departmentkey';

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
    if (name.length == 0) {
      let nameElement = document.getElementById("name" + this.key)
      nameElement.focus()
    }
    el.addEventListener('dragstart', (event) => {
      console.log('dragStartHandler ' + this.key);
      console.log('dragStartHandler owner' + this.itemForm.get('owner').value);
      event.dataTransfer.setData(this.dndItemKey, this.key);
      event.dataTransfer.setData(this.dndDepartmentKey, this.itemForm.get('owner').value);
      event.dataTransfer.dropEffect = "move"
    })
    el.addEventListener('dragend', (event) => {
      //console.log('dragend ' + this.key)
      event.preventDefault();
    })
    // handle droptarget
    //el = document.getElementById('dz' + this.key)
    el.addEventListener('dragenter', (event) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      el.className = "dzenter"
    })
    el.addEventListener('dragleave', (event) => {
      event.preventDefault()
      el.className = "dzleave"
    })
    el.addEventListener('drop', (event: DragEvent) => {
      console.log('dropHandler ')
      let key = event.dataTransfer.getData(this.dndItemKey);
      let owner = event.dataTransfer.getData(this.dndDepartmentKey);
      console.log('dropHandler key ' + key)
      console.log('dropHandler owner ' + owner)
      let order = event.currentTarget[6].value
      console.log('dropHandler order ' + order)
      let targetElementKey = event.currentTarget[0].value
      let targetElement = document.getElementById(targetElementKey)
      let targetElementOwner = targetElement[1].value
      console.log('dropHandler targetElementKey ' + targetElementKey + ' ' + targetElementOwner)
      let nextForm = this.get_nextform(targetElement.parentElement.parentElement.parentElement.parentElement)
      let nextElementOrder = nextForm[6].value
      console.log('dropHandler nextElement order ' + nextElementOrder )

      //TODO gard for no nextElemet, calculate owner and order for the moved item and update database

      //this.databaseService.deleteItem(key)
      el.className = "dzleave"
    })
    el.addEventListener('dragover', (event) => {
      //console.log('dragover ' + this.key)
      event.preventDefault()
    })
  }

  get_nextform(node) {//*[@id="-Kd_2HuqnsLJK9egqcNB"]
    //console.log('get_nextform ' + node.nodeName + ' ' + node.innerHTML)
    var el: Element = node.nextElementSibling
    var forms = el.getElementsByTagName("FORM")
    //console.log('get_nextform ' + JSON.stringify(forms.length))
    //console.log('get_nextform ' + JSON.stringify(forms[0].id))
    /*console.log('get_nextform ' + el.nodeName + ' ' + el.innerHTML)
    while (el.nodeName != "FORM") { // skip all but FORM elements
      el = el.firstElementChild;
      if (el) {
        console.log('get_nextform ' + el.nodeName + ' ' + el.innerHTML)
      } else {
        console.log('get_nextform null or undefined')
      }

    }
    */
    return forms[0];
  }

  onChange() {
    //console.log("itemChanged " + JSON.stringify(this.itemForm.value));
    this.databaseService.updateItem(this.itemForm.value);
  }

}
