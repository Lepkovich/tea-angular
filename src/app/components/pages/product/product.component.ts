import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {ProductType} from "../../../types/product.type";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  @Input() product: ProductType;
  constructor(private router: Router,
              private productService: ProductService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price : 0
    }
  }

  ngOnInit():void {

  }

  addToCart(title: string): void {

  }
}
