import {Component, Injectable, OnInit} from '@angular/core';
import {SearchService} from "../../../services/search.service";
import { Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@Injectable({
  providedIn: 'root'
})


export class HeaderComponent{
  searchQuery: string = '';

  constructor(private searchService: SearchService,
              private router: Router
              ) {}


  onSearchChange() {
    this.searchService.setSearchQuery(this.searchQuery);
  }

  resetSearch() {
    if (!this.searchQuery) {
      this.searchService.setSearchQuery('');
      this.router.navigate(['/products'])
    }
  }
}
