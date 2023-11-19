import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {map, Subscription, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  private productServiceSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;
  products: ProductType[] = [];
  searchQuery: string = '';
  loading: boolean = false;


  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit() {
    this.routeSubscription = this.route.queryParams
      .subscribe(params => {
        this.searchQuery = params['search'] || '';
        this.getProducts();
      });
  }


  getProducts() {
    this.loading = true;
    this.productServiceSubscription = this.productService.getProducts(this.searchQuery)
      .pipe(
        map((data: any) => {
          if (Array.isArray(data)) {
            data.forEach(product => {
              if (product.description.length > 200) {
                product.description = this.truncateString(product.description) + " ...";
              }
            });
          } else if (typeof data === 'object' && data !== null) {
            // Если это одиночный продукт
            const productId = Object.keys(data)[0];
            const productData = data[productId];
            data = [{
              id: productData.id,
              image: productData.image,
              title: productData.title,
              price: productData.price,
              description: productData.description.length > 200
                ? this.truncateString(productData.description) + " ..."
                : productData.description,
            }];
          }
          return data;
        })
      )
      .subscribe({
        next: (data) => {
          this.loading = false;
          this.products = data;
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
          this.router.navigate(['/'])
        }
      })
  }


  truncateString(text: string): string {
    let truncated = text.substring(0, 200);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
      text = truncated.substring(0, lastSpaceIndex);
    }
    return text;
  }

  ngOnDestroy() {
    this.productServiceSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
