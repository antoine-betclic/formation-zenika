import { inject, Injectable } from '@angular/core';
import { Product } from './product/product.types';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  products: Product[] = [];

  apiService = inject(ApiService)

  get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }

  fetch(): Observable<Product[]> {
    return this.apiService
    .getProducts().pipe(tap((products) => this.products = products))
  } 

  private decreaseStock(productId: string): void {
    delete this.products[this.products.findIndex(p => p.id === productId)]
  }
  private isAvailable(product: Product): boolean {
    return !!this.products.find(() => product)
  } 
}
