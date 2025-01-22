import { Routes } from '@angular/router';

import { CatalogComponent } from './catalog/catalog.component';
import { BasketComponent } from './basket/basket.component';

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'basket', component: BasketComponent },
];
