import {Component, Input} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: ProductType;

  constructor(private productService: ProductService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }
  }

  addToCart(title: string): void {
    this.productService.product = title;
  }
}
