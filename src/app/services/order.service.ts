import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderType} from "../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(data: OrderType) {
    return this.http.post<{success: number}>('https://testologia.site/order-tea', data);
  }
}
