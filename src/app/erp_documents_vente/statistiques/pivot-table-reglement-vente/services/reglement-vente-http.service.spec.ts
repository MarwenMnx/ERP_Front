import { TestBed } from '@angular/core/testing';

import { ReglementVenteHttpService } from './reglement-vente-http.service';

describe('ReglementVenteHttpService', () => {
  let service: ReglementVenteHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglementVenteHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
