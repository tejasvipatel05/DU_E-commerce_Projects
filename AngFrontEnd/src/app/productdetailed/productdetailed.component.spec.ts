import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdetailedComponent } from './productdetailed.component';

describe('ProductdetailedComponent', () => {
  let component: ProductdetailedComponent;
  let fixture: ComponentFixture<ProductdetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductdetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductdetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
