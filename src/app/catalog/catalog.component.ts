import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

import { BasketItem } from '../basket/basket.types';
import { Product } from './product/product.types';
import { ApiService } from '../shared/services/api.service';
import { ProductComponent } from './product/product.component';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-catalog',
  imports: [ProductComponent, RouterLink, CurrencyPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent { 

  get basketTotal(): number {
    return this.basketItems.reduce(
      (total: number, { price }) => total + price,
      0
    );
  }

  private basketItems: BasketItem[] = [];
  basketService = inject(BasketService);
  catalogService = inject(CatalogService);

  constructor() {
    this.catalogService.fetch().pipe(first()).subscribe();
  }

  addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe((basketItem) => {
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
