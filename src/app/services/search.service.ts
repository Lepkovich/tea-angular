import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchQuerySubject = new Subject<string>();

  setSearchQuery(searchQuery: string) {
    this.searchQuerySubject.next(searchQuery);
  }

  getSearchQuery() {
    return this.searchQuerySubject.asObservable();
  }
  constructor() {
    // this.searchQuerySubject
    //   .subscribe((param: string) => {
    //     console.log(param)
    //   } )
  }
}
