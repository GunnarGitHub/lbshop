import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject'

@Injectable()
export class SearchService {

  searchSubject: ReplaySubject<string>

  constructor() {
    this.searchSubject = new ReplaySubject<string>()//.share<string>() as ReplaySubject<string>;
    this.next('')
   }

  public next(value: string) {
    this.searchSubject.next(value);
  }

  public getSearchSubject(): ReplaySubject<string> {
    return this.searchSubject;
  }

}
