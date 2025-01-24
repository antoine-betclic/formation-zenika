import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from './product/product.types';
import { ProductComponent } from './product/product.component';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  imports: [ProductComponent, RouterLink, CurrencyPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {
  private basketService = inject(BasketService);
  private catalogService = inject(CatalogService);

  products = this.catalogService.products;
  isStockEmpty = this.catalogService.isStockEmpty;
  basketTotal = this.basketService.total;

  ngOnInit() {
    this.basketService.fetch().subscribe();
  
  }

  addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe(() => {
      this.catalogService.decreaseStock(product.id);
    });
  }

  isAvailable(product: Product): boolean {
    return this.catalogService.isAvailable(product);
  }
}
