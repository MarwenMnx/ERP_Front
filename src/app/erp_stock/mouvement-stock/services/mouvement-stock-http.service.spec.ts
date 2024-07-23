import { TestBed } from '@angular/core/testing';

import { MouvementStockHttpService } from './mouvement-stock-http.service';

describe('MouvementStockHttpService', () => {
  let service: MouvementStockHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouvementStockHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
