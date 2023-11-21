import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../../../types/product.type";


@Injectable({
  providedIn: 'root'
})

export class ProductService implements OnInit, OnDestroy {

  constructor(private http: HttpClient) {}

  ngOnInit() {

  }

  getProducts(query? :string): Observable<ProductType[]> {



    const url = query !== '' ? `https://testologia.site/tea?search=${query}` : 'https://testologia.site/tea';
    return this.http.get<ProductType[]>(url);

    // return this.searchService.getSearchQueryObservable().pipe(
    //   startWith(''), // Добавляем оператор startWith с пустой строкой, чтобы излучить значение при первой подписке
    //   switchMap(query => {
    //     console.log ('мы внутри switchMap');
    //     const url = query ? `https://testologia.site/tea?search=${query}` : 'https://testologia.site/tea';
    //     return this.http.get<ProductType[]>(url);
    //   })
    // );


    // this.searchQuerySubscription = this.searchService.getSearchQueryObservable().subscribe(query => {
    //   this.searchQuery = query;
    // })
    // console.log('searchQuery в product-service: ' + this.searchQuery);

    // if (query) {
    //   this.url = `https://testologia.site/tea?search=${query}`;
    // } else {
    //   this.url = 'https://testologia.site/tea'
    // }
    // return this.http.get<ProductType[]>(this.url);



  }

  ngOnDestroy() {
    // this.searchQuerySubscription?.unsubscribe()
  }
}
