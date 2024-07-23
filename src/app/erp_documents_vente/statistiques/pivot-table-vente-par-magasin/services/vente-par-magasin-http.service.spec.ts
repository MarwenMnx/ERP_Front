import { TestBed } from '@angular/core/testing';

import { VenteParMagasinHttpService } from './vente-par-magasin-http.service';

describe('VenteParMagasinHttpService', () => {
  let service: VenteParMagasinHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenteParMagasinHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
