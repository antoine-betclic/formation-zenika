import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { BasketItem } from './basket.types';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe, NgIf, NgFor],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  customer: Customer = { name: '', address: '', creditCard: '' };
  basketItems: BasketItem[] = [];

  get basketTotal(): number {
    return this.basketItems.reduce((total, { price }) => total + price, 0);
  }

  private apiService = inject(ApiService);
  private router = inject(Router);

  constructor() {
    this.apiService.getBasket().subscribe((basketItems) => (this.basketItems = basketItems));
  }

  checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.apiService.checkoutBasket(this.customer).subscribe(() => {
      this.basketItems = [];
      this.router.navigate(['']);
    });
  }
}
