import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  id = input<string>();

  product$ = this.route.data.pipe(map(data => data['product']))

}
