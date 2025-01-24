import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailDescriptionComponent } from './product-detail-description.component';

describe('ProductDetailDescriptionComponent', () => {
  let component: ProductDetailDescriptionComponent;
  let fixture: ComponentFixture<ProductDetailDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
