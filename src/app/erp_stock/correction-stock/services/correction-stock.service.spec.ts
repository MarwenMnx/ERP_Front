import { TestBed } from '@angular/core/testing';

import { CorrectionStockService } from './correction-stock.service';

describe('CorrectionStockService', () => {
  let service: CorrectionStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrectionStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
