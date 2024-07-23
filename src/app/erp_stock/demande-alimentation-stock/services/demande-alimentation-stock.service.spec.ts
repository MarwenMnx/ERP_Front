import { TestBed } from '@angular/core/testing';

import { DemandeAlimentationStockService } from './demande-alimentation-stock.service';

describe('DemandeAlimentationStockService', () => {
  let service: DemandeAlimentationStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeAlimentationStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
