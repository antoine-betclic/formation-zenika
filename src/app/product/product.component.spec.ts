import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductComponent } from './product.component';
import { Product } from './product.types';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    
    fixture.componentRef.setInput('product', {});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
