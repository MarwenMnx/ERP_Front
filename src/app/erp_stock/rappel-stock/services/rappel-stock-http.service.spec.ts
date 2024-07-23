import { TestBed } from '@angular/core/testing';

import { RappelStockHttpService } from './rappel-stock-http.service';

describe('RappelStockHttpService', () => {
  let service: RappelStockHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RappelStockHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
