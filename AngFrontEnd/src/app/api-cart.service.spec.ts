import { TestBed } from '@angular/core/testing';

import { ApiCartService } from './api-cart.service';

describe('ApiCartService', () => {
  let service: ApiCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
