import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {map, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";



@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy{

  private subscription: Subscription | null = null;
  products: ProductType[] = [];


  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}


  ngOnInit() {
  //   пример как нужно взять queryParams из URL
  //   this.subscription = this.activatedRoute.queryParams.subscribe((params) => { //колл-бэк функция с одним параметром
  //     if (params['product']) {
  //       this.orderForm.patchValue({
  //         product: params['product'], //передали параметр product из URL
  //       });
  //       this.productValue = params['product']; //присвоили product (мы не можем взять его при disabled: true)
  //     }
  //   })
  // }
    this.subscription = this.productService.getProducts()
      .pipe(
        map((data: ProductType[]) => {
          data.forEach(product => {
            //сократим описание до 200 символов
            if (product.description.length > 200) {
              // product.description = product.description.substring(0, 200) + " ..."
              product.description = this.truncateString(product.description) + " ...";
            }
          })
          return data;
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

  truncateString(text: string): string {
    let truncated = text.substring(0, 200);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex !==-1) {
      text = truncated.substring(0, lastSpaceIndex);
    }
    return text;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
