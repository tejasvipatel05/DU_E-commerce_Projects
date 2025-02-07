import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustArrivedComponent } from './just-arrived.component';

describe('JustArrivedComponent', () => {
  let component: JustArrivedComponent;
  let fixture: ComponentFixture<JustArrivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustArrivedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustArrivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
