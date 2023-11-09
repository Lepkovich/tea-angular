import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: string = '';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.site/tea');
  }
}
