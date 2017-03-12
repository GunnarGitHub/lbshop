import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DatabaseService } from './../../common/services';

@Component({
  selector: 'item-drop-zone',
  templateUrl: './item-drop-zone.component.html',
  styleUrls: ['./item-drop-zone.component.css']
})
export class ItemDropZoneComponent implements OnInit, AfterViewInit {
  internalDNDType='string:text/itemkey'
  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let el = document.getElementById('itemdropzone')
    console.log('ngAfterViewInit ' + el);
    el.addEventListener('dragenter', (event) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      el.className = "dzenter"
    })
    el.addEventListener('dragleave', (event) => {
      event.preventDefault()
      el.className = "dzleave"
    })
    el.addEventListener('drop', (event: any) => {
      let key = event.dataTransfer.getData(this.internalDNDType);;
      console.log('dropHandler' + key)
      this.databaseService.deleteItem(key)
      el.className = "dzleave"
    })
    el.addEventListener('dragover', (event) => {
      event.preventDefault()
    })
  }
}
