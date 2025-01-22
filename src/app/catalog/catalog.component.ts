import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

import { BasketItem } from '../basket/basket.types';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-catalog',
  imports: [ProductComponent, RouterLink, CurrencyPipe, NgIf, NgFor],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  products: Product[] = [];

  get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }

  get basketTotal(): number {
    return this.basketItems.reduce(
      (total: number, { price }) => total + price,
      0
    );
  }

  private basketItems: BasketItem[] = [];
  private apiService = inject(ApiService);

  constructor() {
    this.apiService
      .getProducts()
      .subscribe((products) => (this.products = products));
    this.apiService
      .getBasket()
      .subscribe((basketItems) => (this.basketItems = basketItems));
  }

  addToBasket(product: Product): void {
    this.apiService.addToBasket(product.id).subscribe((basketItem) => {
      this.basketItems.push(basketItem);
      this.decreaseStock(product);
    });
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  private decreaseStock(product: Product): void {
    product.stock -= 1;
  }
}
