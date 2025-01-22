import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from './product.types';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RouterLink, UpperCasePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToBasket = new EventEmitter<Product>();

  onClick(): void {
    this.addToBasket.emit(this.product);
  }

  isTheLast(): boolean {
    return this.product.stock === 1;
  }
}
