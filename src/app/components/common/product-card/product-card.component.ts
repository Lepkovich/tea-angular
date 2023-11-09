import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: ProductType;
  @Output() addToCartEvent: EventEmitter<ProductType> = new EventEmitter<ProductType>();

  constructor(public productService: ProductService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }
  }

  addToCart() {
    this.addToCartEvent.emit(this.product);
  }
}
