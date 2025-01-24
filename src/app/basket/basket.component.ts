import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent implements OnInit {
  private router = inject(Router);
  private basketService = inject(BasketService);

  customer: Customer = { name: '', address: '', creditCard: '' };

  basketItems = this.basketService.items;
  basketTotal = this.basketService.total;

  ngOnInit() {
    this.basketService.fetch().subscribe();
  }

  checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => {
      this.router.navigate(['']);
    })
  }
}
