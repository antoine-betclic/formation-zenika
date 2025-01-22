import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
