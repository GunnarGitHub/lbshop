import { ReplaySubject } from 'rxjs/ReplaySubject';
import { SearchService } from './../services';
import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchControl = new FormControl()

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(val => this.searchService.next(val))
  }

  ngOnDestroy() {

  }
}
