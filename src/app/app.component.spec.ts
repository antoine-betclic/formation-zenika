import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      remove: {
        imports: [FooterComponent, MenuComponent]
      },
      add: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
