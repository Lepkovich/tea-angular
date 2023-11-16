import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {ProductType} from "../../../types/product.type";
import {tap} from "rxjs";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  products: ProductType[] = [];
  product: ProductType = {} as ProductType ;
  productId: number | null = 0;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit():void {


    // Получение текущего пути URL
    const currentPath = window.location.pathname;

// Разделение пути по символу "/"
    const pathParts = currentPath.split('/');

// Получение последней части пути (последний элемент массива)
    const lastPart = pathParts[pathParts.length - 1];

// Преобразование последней части в число
    this.productId = Number(lastPart);

    // Получение параметра 'id' из URL
    // this.activatedRoute.paramMap.subscribe(params => {
    //   if (this.productId) {
    //     this.productId = params.get('id');
    //     console.log('Product ID:', this.productId);
    //   }
    // });

    this.productService.getProducts()
      .pipe(
        tap((result) => {
          // console.log(result)
        })
      )
      .subscribe({
        next: (data) => {
          if (this.productId) {
              this.product = data[this.productId-1];
          }
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/'])
        }
      })
  }
}
