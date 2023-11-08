import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  private subscription: Subscription | null = null;
  products: ProductType[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private productService: ProductService
  ) {

  }

  ngOnInit() {
    this.subscription = this.productService.getProducts()
      .pipe(
        tap((result) => {
          console.log(result)
        })
      )
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/'])
        }
      })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
