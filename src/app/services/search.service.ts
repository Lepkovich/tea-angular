import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject = new Subject<string>();

  getSearchQueryObservable(): Observable<string> {
    console.log('геттер запрошен');
    return this.searchQuerySubject.asObservable();
  }

  setSearchQuery(query: string) {
    console.log('сеттер установлен: ' + query)
    this.searchQuerySubject.next(query);
  }
}
