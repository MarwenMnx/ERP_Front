import { TestBed } from '@angular/core/testing';

import { PivotTableRayonHttpService } from './pivot-table-rayon-http.service';

describe('PivotTableRayonHttpService', () => {
  let service: PivotTableRayonHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PivotTableRayonHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
