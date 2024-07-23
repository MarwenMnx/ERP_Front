import { TestBed } from '@angular/core/testing';

import { ValeurStockHttpService } from './valeur-stock-http.service';

describe('ValeurStockHttpService', () => {
  let service: ValeurStockHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValeurStockHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
