import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {ProductType} from "../../../types/product.type";

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


    // Получение параметра 'id' из URL
    // this.activatedRoute.paramMap.subscribe(params => {
    //   if (this.productId) {
    //     this.productId = params.get('id');
    //     console.log('Product ID:', this.productId);
    //   }
    // });

    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    this.productId = Number(lastPart);

    this.productService.getProducts('')
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
