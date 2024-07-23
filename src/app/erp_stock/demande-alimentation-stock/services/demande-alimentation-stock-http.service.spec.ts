import { TestBed } from '@angular/core/testing';

import { DemandeAlimentationStockHttpService } from './demande-alimentation-stock-http.service';

describe('DemandeAlimentationStockHttpService', () => {
  let service: DemandeAlimentationStockHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeAlimentationStockHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
