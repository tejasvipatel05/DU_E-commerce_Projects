import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountPurchaseComponent } from './discount-purchase.component';

describe('DiscountPurchaseComponent', () => {
  let component: DiscountPurchaseComponent;
  let fixture: ComponentFixture<DiscountPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
