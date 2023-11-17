import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject = new Subject<string>();

  getSearchQueryObservable(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }
}
