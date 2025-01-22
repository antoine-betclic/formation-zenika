import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  numberOfBasketItems = 0;

  private apiService = inject(ApiService);

  constructor() {
    this.apiService.getBasket().subscribe(({ length }) => (this.numberOfBasketItems = length));
  }
}
