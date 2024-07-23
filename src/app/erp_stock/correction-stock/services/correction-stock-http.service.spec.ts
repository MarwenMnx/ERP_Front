import { TestBed } from '@angular/core/testing';

import { CorrectionStockHttpService } from './correction-stock-http.service';

describe('CorrectionStockHttpService', () => {
  let service: CorrectionStockHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrectionStockHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
