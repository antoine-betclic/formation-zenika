import { RedirectCommand, Routes } from '@angular/router';

import { CatalogComponent } from './catalog/catalog.component';
import { BasketComponent } from './basket/basket.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, CanActivateFn,
  Router,
  RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import { CatalogService } from './catalog/catalog.service';
import { Product } from './catalog/product/product.types';
import { BasketService } from './basket/basket.service';

@Injectable({ providedIn: 'root' })
export class CatalogResolver implements Resolve<Product[]> {
  catalogService = inject(CatalogService);
  resolve(): Observable<Product[]> {
    return this.catalogService.fetch();
  }
}

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Product> {
  catalogService = inject(CatalogService);
  resolve(route: ActivatedRouteSnapshot): Product {
    return this.catalogService.products().filter(p => p.id === route.paramMap.get('id')!)[0] ;
  }
}



export const BasketGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const basketService = inject(BasketService);
  const isBasketNotEmpty = !!basketService.numberOfItems();
  return isBasketNotEmpty ? true : new RedirectCommand(router.parseUrl('/anyothercomponent'));
};

export const routes: Routes = [
  { path: '', loadComponent : () => (
    import('./catalog/catalog.component').then((m) => m.CatalogComponent)
  ), resolve: { _ : CatalogResolver}},
  { path: 'product/:id', loadComponent : () => (
    import('./catalog/product/product-detail/product-detail.component').then((m) => m.ProductDetailComponent)
  ), resolve: { product : ProductResolver}},
  { path: 'basket', loadComponent : () =>
   import('./basket/basket.component').then((m) => m.BasketComponent)   
  , canActivate: [BasketGuard] },
  { path: '**', component: NotFoundComponent },
];
