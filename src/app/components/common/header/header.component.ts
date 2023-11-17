import {Component, Injectable} from '@angular/core';
import {SearchService} from "../../../services/search.service";

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

  constructor(private searchService: SearchService) {
  }

  onSearchChange() {
    console.log('значение searchQuery из header:' + this.searchQuery);
    this.searchService.setSearchQuery(this.searchQuery);
  }
}
