import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  fullYear = new Date().getUTCFullYear();

  private apiService = inject(ApiService);
  private document = inject(DOCUMENT);

  __kaboom__() {
    this.apiService.__kaboom__().subscribe(() => this.document.location.reload());
  }
}
