import {Component, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@Injectable({
  providedIn: 'root'
})


export class HeaderComponent {
  searchQuery: string = '';
  private searchQuerySubject = new Subject<string>();
  getSearchQueryObservable(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }
  constructor() {
  }

  onSearchChange() {
    console.log('значение searchQuery из header:' + this.searchQuery);
    this.searchQuerySubject.next('тест');
  }

}
